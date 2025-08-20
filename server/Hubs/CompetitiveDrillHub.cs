using Microsoft.AspNetCore.SignalR;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services;
using server.Services.Interfaces;
using server.Utils;
using System.Security.Claims;

namespace server.Hubs
{
    public interface ICompetitiveDrillClient
    {
        // room management
        Task RoomCreated(string roomId, string roomCode);
        Task RoomJoined(string roomId, string roomCode);
        Task RoomInfo(string roomId, string roomCode, string createdBy);
        Task RoomDisbanded(string roomId, string reason);
        
        // player management
        Task PlayerJoin(string roomId, string userId, string username, int level, string competitiveRank, bool isCreator = false, bool isReady = false);
        Task PlayerStateUpdate(string roomId, string userId, string username, bool isReady, bool isCreator, double wpm = 0, double accuracy = 0, int completionPercentage = 0);
        Task PlayerLeave(string roomId, string userId);
        Task PlayerReady(string roomId, string userId, bool isReady, object? competitiveStats = null);
        Task PlayerStatisticsUpdate(string roomId, List<PlayerStatistics> statistics);
        Task AllPlayersCompleted(string roomId);

        // drill lifecycle
        Task StartDrill(string roomId, List<string> drillText);
        Task BeginDrill(string roomId, List<string> drillText);
        Task EndDrill(string roomId, DrillSummary results);
        Task WaitingForOtherPlayers(int finishedCount, int totalCount);
        
        // misc
        Task PlayerAFK(string roomId, string userId);
        Task AFKWarning(string roomId, string userId, int timeoutSeconds);
        Task PlayerKicked(string roomCode, string reason);
        Task Countdown(string roomId, int countdown);
        Task AllPlayersContinued(string roomCode);
        Task WaitingForPlayersToContinue(string roomCode, int continuedCount, int totalCount);
    }

    public class CompetitiveDrillHub : Hub<ICompetitiveDrillClient>
    {
        private readonly ICompetitiveDrillOrchestrator _orchestrator;
        private readonly IRoomService _roomService;
        private readonly ICompetitiveDrillService _competitiveDrillService;
        private readonly IAFKDetectionService _afkDetectionService;
        private readonly IDrillTextService _drillTextService;
        private readonly ILevelCalculationService _levelCalculationService;
        private readonly IUserService _userService;
        private readonly IProfileService _profileService;
        
        // track countdown state to prevent multiple countdowns
        private static readonly Dictionary<string, bool> _countdownInProgress = new();
        // track per-room progress broadcast timers (500ms) and end-of-drill timers
        private static readonly Dictionary<string, System.Threading.Timer> _progressTimers = new();
        private static readonly Dictionary<string, System.Threading.Timer> _drillEndTimers = new();
        private static readonly object _timerLock = new();
        
        // In-memory statistics cache for active drills
        private static readonly Dictionary<string, Dictionary<string, PlayerStatistics>> _activeDrillStats = new();
        private static readonly object _statsLock = new();
        public CompetitiveDrillHub(
            ICompetitiveDrillOrchestrator orchestrator,
            IRoomService roomService,
            ICompetitiveDrillService competitiveDrillService,
            IAFKDetectionService afkDetectionService,
            IDrillTextService drillTextService,
            ILevelCalculationService levelCalculationService,
            IUserService userService,
            IProfileService profileService)
        {
            _orchestrator = orchestrator;
            _roomService = roomService;
            _competitiveDrillService = competitiveDrillService;
            _afkDetectionService = afkDetectionService;
            _drillTextService = drillTextService;
            _levelCalculationService = levelCalculationService;
            _userService = userService;
            _profileService = profileService;
        }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"Client connected: {Context.ConnectionId}");
            await base.OnConnectedAsync();
        }

        // test method to verify SignalR communication
        public string TestConnection()
        {
            var userId = GetUserId();
            return $"Connection test successful. User ID: {userId}";
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            try
            {
                Console.WriteLine($"Client disconnected: {Context.ConnectionId}");
                if (exception != null)
                {
                    Console.WriteLine($"Disconnect exception: {exception.Message}");
                    Console.WriteLine($"Disconnect exception type: {exception.GetType().Name}");
                    Console.WriteLine($"Disconnect stack trace: {exception.StackTrace}");
                }
                
                // Log connection details for debugging
                Console.WriteLine($"Connection ID: {Context.ConnectionId}");
                Console.WriteLine($"User authenticated: {Context.User?.Identity?.IsAuthenticated}");
                
                // handle player disconnect
                var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!string.IsNullOrEmpty(userId))
                {
                    Console.WriteLine($"Handling disconnect for authenticated user: {userId}");
                    // find which room the player was in and remove them
                    await HandlePlayerDisconnect(userId);
                }
                else
                {
                    Console.WriteLine("No user ID found in disconnect context - user may not have been authenticated");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in OnDisconnectedAsync: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
            }
            finally
            {
                await base.OnDisconnectedAsync(exception);
            }
        }

        public async Task<object> CreateRoom(CreateRoomRequest request)
        {
            try
            {
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    return new { success = false, error = "User not authenticated" };
                }

                // convert request to DrillSettings
                var settings = new DrillSettings
                {
                    Type = request.Type,
                    Difficulty = request.Difficulty,
                    Duration = request.Duration ?? 60,
                    Length = request.Length ?? 50
                };

                var room = await _roomService.CreateRoomAsync(userId, settings);

                await Groups.AddToGroupAsync(Context.ConnectionId, room.RoomCode);

                await Clients.Group(room.RoomCode).RoomCreated(room.RoomId, room.RoomCode);

                var username = await GetUsernameAsync(userId);
                var level = GetUserLevel(userId);
                var competitiveRank = await GetUserCompetitiveRankAsync(userId);
                await Clients.Group(room.RoomCode).PlayerJoin(room.RoomId, userId, username, level, competitiveRank, true, false);

                return new { success = true, roomId = room.RoomId, roomCode = room.RoomCode };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating room: {ex.Message}");
                return new { success = false, error = ex.Message };
            }
        }

        public async Task<object> JoinRoom(string roomCode)
        {
            try
            {
                var userId = GetUserId();
                
                if (string.IsNullOrEmpty(userId))
                {
                    return new { success = false, error = "User not authenticated" };
                }

                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room == null)
                {
                    return new { success = false, error = "Room not found" };
                }
                
                if (room.State != RoomState.Waiting)
                {
                    return new { success = false, error = "Room is not accepting new players" };
                }

                if (room.Availability == RoomAvailability.Full)
                {
                    return new { success = false, error = "Room is full" };
                }

                if (room.ActiveCompetitiveDrillId != null)
                {
                    return new { success = false, error = "Cannot join room during an active drill" };
                }

                var success = await _roomService.AddPlayerToRoomAsync(roomCode, userId, false);
                
                if (!success)
                {
                    return new { success = false, error = "Failed to join room" };
                }

                await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

                var currentPlayers = await _roomService.GetPlayersInRoomAsync(roomCode);
                foreach (var player in currentPlayers)
                {
                    var playerUsername = await GetUsernameAsync(player.UserId);
                    var playerLevel = GetUserLevel(player.UserId);
                    var playerCompetitiveRank = await GetUserCompetitiveRankAsync(player.UserId);
                    var isPlayerCreator = player.IsCreator;
                    var isPlayerReady = player.IsReady;
                    
                    await Clients.Caller.PlayerJoin(room.RoomId, player.UserId, playerUsername, playerLevel, playerCompetitiveRank, isPlayerCreator, isPlayerReady);
                }

                var username = await GetUsernameAsync(userId);
                var level = GetUserLevel(userId);
                var competitiveRank = await GetUserCompetitiveRankAsync(userId);
                var isNewPlayerCreator = room.CreatedBy == userId;
                await Clients.Group(roomCode).PlayerJoin(room.RoomId, userId, username, level, competitiveRank, isNewPlayerCreator, false);
                
                await Clients.Caller.RoomJoined(room.RoomId, roomCode);

                return new { success = true, roomId = room.RoomId, roomCode = room.RoomCode };
            }
            catch (Exception ex)
            {
                return new { success = false, error = ex.Message };
            }
        }

        public async Task<object> LeaveRoom(string roomCode)
        {
            try
            {
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    return new { success = false, error = "User not authenticated" };
                }

                // Get room info to check if user is creator
                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room == null)
                {
                    return new { success = false, error = "Room not found" };
                }

                var isCreator = room.CreatedBy == userId;
                Console.WriteLine($"User {userId} leaving room {roomCode}, isCreator: {isCreator}");

                // If there's an active drill, mark the player as disconnected in the drill
                if (room.ActiveCompetitiveDrillId != null)
                {
                    await _competitiveDrillService.MarkPlayerDisconnectedAsync(roomCode, userId);
                }

                if (isCreator)
                {
                    // Creator is leaving - disband the room and notify all players
                    Console.WriteLine($"Room creator {userId} is leaving, disbanding room {roomCode}");
                    
                    // Stop any active timers for this room
                    StopRoomTimers(roomCode);
                    
                    // Clear statistics cache
                    ClearDrillStatistics(roomCode);
                    
                    // Remove connection from group
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomCode);
                    
                    // Notify all players that the room has been disbanded
                    await Clients.Group(roomCode).RoomDisbanded(room.RoomId, "Room creator has left the room");
                    
                    // Deactivate the room
                    await _roomService.DeactivateRoomAsync(roomCode);
                    
                    Console.WriteLine($"Room {roomCode} disbanded because creator left");
                }
                else
                {
                    // Regular player leaving
                    var success = await _roomService.RemovePlayerFromRoomAsync(roomCode, userId);
                    if (!success)
                    {
                        return new { success = false, error = "Failed to leave room" };
                    }

                    // If the room is empty after removal, delete it
                    var remainingPlayers = await _roomService.GetPlayersInRoomAsync(roomCode);
                    if (remainingPlayers.Count == 0)
                    {
                        Console.WriteLine($"Room {roomCode} is empty, deleting room");
                        await _roomService.DeleteRoomAsync(roomCode, userId);
                        // clear statistics cache
                        ClearDrillStatistics(roomCode);
                    }

                    // Remove connection from group
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomCode);

                    Console.WriteLine($"User {userId} left room {roomCode}");

                    // Notify all clients in the room
                    await Clients.Group(roomCode).PlayerLeave(roomCode, userId);
                }

                return new { success = true };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error leaving room: {ex.Message}");
                return new { success = false, error = ex.Message };
            }
        }

        public async Task<object> GetRoomInfo(string roomCode)
        {
            try
            {
                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room == null)
                {
                    return new { success = false, error = "Room not found" };
                }

                return new
                {
                    success = true,
                    roomId = room.RoomId,
                    roomCode = room.RoomCode,
                    state = room.State.ToString(),
                    createdBy = room.CreatedBy,
                    settings = new
                    {
                        type = room.DrillSettings.Type.ToString(),
                        difficulty = room.DrillSettings.Difficulty.ToString(),
                        duration = room.DrillSettings.Duration,
                        length = room.DrillSettings.Length
                    }
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetRoomInfo: {ex.Message}");
                return new { success = false, error = ex.Message };
            }
        }

        public async Task<object> SetPlayerReady(string roomCode, bool isReady)
        {
            try
            {
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    return new { success = false, error = "User not authenticated" };
                }

                // set player ready status using database
                var success = await _roomService.UpdatePlayerReadyStateAsync(roomCode, userId, isReady);
                if (!success)
                {
                    return new { success = false, error = "Failed to set ready status" };
                }

                // get all players in the room and their competitive stats
                var roomPlayers = await _roomService.GetPlayersInRoomAsync(roomCode);
                var allPlayerStats = new Dictionary<string, object>();

                foreach (var player in roomPlayers)
                {
                    try
                    {
                        var profile = await _profileService.GetByUserId(player.UserId);
                        if (profile != null)
                        {
                            var winrate = profile.CompetitiveDrills > 0 
                                ? Math.Round((double)profile.Wins / profile.CompetitiveDrills * 100, 1)
                                : 0.0;

                            allPlayerStats[player.UserId] = new
                            {
                                totalDrills = profile.CompetitiveDrills,
                                wins = profile.Wins,
                                losses = profile.Losses,
                                winrate = winrate
                            };
                        }
                    }
                    catch (Exception ex)
                    {
                        // Continue without stats for this player if there's an error
                    }
                }

                // notify all clients in the room about the state change with all player stats
                await Clients.Group(roomCode).PlayerReady(roomCode, userId, isReady, allPlayerStats);

                return new { success = true };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error setting player ready: {ex.Message}");
                return new { success = false, error = ex.Message };
            }
        }

        public async Task UpdatePlayerStatistics(string roomCode, PlayerStatistics statistics)
        {
            try
            {
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    throw new UnauthorizedAccessException("User not authenticated");
                }

                // ONLY update in-memory statistics cache - NO DATABASE CALLS
                lock (_statsLock)
                {
                    if (!_activeDrillStats.ContainsKey(roomCode))
                    {
                        _activeDrillStats[roomCode] = new Dictionary<string, PlayerStatistics>();
                    }

                    _activeDrillStats[roomCode][userId] = statistics;
                }

                // Get all current statistics from cache (NO DATABASE CALL)
                Dictionary<string, PlayerStatistics> roomStats;
                lock (_statsLock)
                {
                    roomStats = _activeDrillStats.ContainsKey(roomCode) 
                        ? new Dictionary<string, PlayerStatistics>(_activeDrillStats[roomCode])
                        : new Dictionary<string, PlayerStatistics>();
                }

                var allStatistics = roomStats.Values.ToList();

                // notify all clients in the room
                await Clients.Group(roomCode).PlayerStatisticsUpdate(roomCode, allStatistics);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdatePlayerStatistics: {ex.Message}");
                throw;
            }
        }

        public async Task ReportPlayerAFK(string roomCode, bool isAFK)
        {
            try
            {
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    throw new UnauthorizedAccessException("User not authenticated");
                }

                // AFK status is now handled at the drill level, not room level
                // For now, we'll just notify clients about the AFK status change
                if (isAFK)
                {
                    await Clients.Group(roomCode).PlayerAFK(roomCode, userId);
                }
                // note: We don't send a specific "not AFK" event since that's handled by regular activity
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in ReportPlayerAFK: {ex.Message}");
                throw;
            }
        }

        public async Task<object> StartDrill(string roomCode)
        {
            try
            {
                Console.WriteLine($"=== START DRILL DEBUG START ===");
                Console.WriteLine($"StartDrill called for room: {roomCode}");
                
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    Console.WriteLine("ERROR: User not authenticated");
                    throw new UnauthorizedAccessException("User not authenticated");
                }

                Console.WriteLine($"User {userId} attempting to start drill");

                // verify user is room creator
                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room?.CreatedBy != userId)
                {
                    Console.WriteLine($"ERROR: User {userId} is not the creator of room {roomCode}");
                    throw new UnauthorizedAccessException("Only room creator can start drill");
                }

                Console.WriteLine($"Room found: {room.RoomCode}, Settings: {room.DrillSettings.Type}, {room.DrillSettings.Difficulty}, {room.DrillSettings.Duration}s");

                // check if countdown is already in progress
                if (_countdownInProgress.ContainsKey(roomCode) && _countdownInProgress[roomCode])
                {
                    Console.WriteLine($"Countdown already in progress for room {roomCode}");
                    return new { success = false, error = "Drill already starting" };
                }

                // get consistent drill text for the room based on settings (ensure same for all)
                var drillText = _drillTextService.GenerateDrillText(room.DrillSettings);
                _drillTextService.SetDrillTextForRoom(roomCode, drillText);
                
                Console.WriteLine($"Using drill text with {drillText.Count} words");

                Console.WriteLine($"Creating competitive drill for room {roomCode}");
                var success = await _orchestrator.StartDrillAsync(roomCode);
                if (!success)
                {
                    Console.WriteLine($"ERROR: Failed to create competitive drill for room {roomCode}");
                    return new { success = false, error = "Failed to start competitive drill" };
                }
                Console.WriteLine($"Competitive drill created successfully for room {roomCode}");
                
                // Refresh room data to get the updated ActiveCompetitiveDrillId
                room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    Console.WriteLine($"ERROR: ActiveCompetitiveDrillId not set after creating competitive drill for room {roomCode}");
                    return new { success = false, error = "Failed to initialize competitive drill" };
                }
                Console.WriteLine($"ActiveCompetitiveDrillId set: {room.ActiveCompetitiveDrillId}");

                // Initialize statistics cache for all players in the room
                var roomPlayers = await _roomService.GetPlayersInRoomAsync(roomCode);
                var playerIds = roomPlayers.Select(p => p.UserId).ToList();
                InitializeDrillStatistics(roomCode, playerIds);

                // Add all ready players to the competitive drill
                foreach (var player in roomPlayers.Where(p => p.IsReady))
                {
                    var addPlayerSuccess = await _competitiveDrillService.AddPlayerToCompetitiveDrillAsync(roomCode, player.UserId);
                    var resetReadyState = await _roomService.UpdatePlayerReadyStateAsync(roomCode, player.UserId, false);
                    
                    if (!addPlayerSuccess || !resetReadyState)
                    {
                        Console.WriteLine($"Warning: Failed to add player {player.UserId} to competitive drill");
                    }
                }

                // clear statistics cache
                ClearDrillStatistics(roomCode);

                // set countdown in progress flag
                _countdownInProgress[roomCode] = true;

                // notify all clients about drill start (this shows the drill text)
                await Clients.Group(roomCode).StartDrill(roomCode, drillText);
                Console.WriteLine($"Notified all clients about drill start");
                
                // start countdown
                await StartCountdown(roomCode);
                
                // after countdown, begin the actual drill
                await Clients.Group(roomCode).BeginDrill(roomCode, drillText);
                Console.WriteLine($"Notified all clients to begin drill");

                // clear countdown flag
                _countdownInProgress[roomCode] = false;

                // start server-side timers
                await StartServerManagedDrillAsync(roomCode, room);

                Console.WriteLine($"=== START DRILL DEBUG END ===");
                return new { success = true };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR in StartDrill: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                Console.WriteLine($"=== START DRILL DEBUG END (ERROR) ===");
                return new { success = false, error = ex.Message };
            }
        }

        public async Task CompleteDrill(string roomCode, DrillResult result)
        {
            try
            {
                Console.WriteLine($"=== COMPLETE DRILL DEBUG START ===");
                Console.WriteLine($"CompleteDrill called for room: {roomCode}, user: {result.UserId}");
                
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    throw new UnauthorizedAccessException("User not authenticated");
                }

                // Check room state and ActiveCompetitiveDrillId before processing
                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                Console.WriteLine($"Room state: {room?.State}, ActiveCompetitiveDrillId: {room?.ActiveCompetitiveDrillId}");
                
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    Console.WriteLine($"ERROR: ActiveCompetitiveDrillId is null for room {roomCode}");
                    Console.WriteLine($"Room state: {room?.State}, DrillSettings: {room?.DrillSettings?.Type}");
                    throw new InvalidOperationException("No active competitive drill found for this room");
                }

                Console.WriteLine($"ActiveCompetitiveDrillId found: {room.ActiveCompetitiveDrillId}");

                // Mark player as finished in the database
                var markFinishedSuccess = await _competitiveDrillService.MarkPlayerFinishedAsync(roomCode, userId, result);
                if (!markFinishedSuccess)
                {
                    Console.WriteLine($"Warning: Failed to mark player {userId} as finished in database");
                }

                // handle player completion
                var success = await _orchestrator.HandlePlayerCompletionAsync(roomCode, userId, result);
                if (success)
                {
                    Console.WriteLine($"Drill completion condition met for room {roomCode}. Sending summary and stopping timers.");
                    StopRoomTimers(roomCode);
                    await SendEndSummaryAsync(roomCode);
                }
                else
                {
                    Console.WriteLine($"Drill completion condition NOT met for room {roomCode}. Waiting for other players.");
                }
                
                Console.WriteLine($"=== COMPLETE DRILL DEBUG END ===");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR in CompleteDrill: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                Console.WriteLine($"=== COMPLETE DRILL DEBUG END (ERROR) ===");
                throw;
            }
        }

        public async Task KickPlayer(string roomCode, string playerId)
        {
            try
            {
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    throw new UnauthorizedAccessException("User not authenticated");
                }

                // verify user is room creator
                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room?.CreatedBy != userId)
                {
                    throw new UnauthorizedAccessException("Only room creator can kick players");
                }

                // If there's an active drill, mark the player as disconnected in the drill
                if (room.ActiveCompetitiveDrillId != null)
                {
                    await _competitiveDrillService.MarkPlayerDisconnectedAsync(roomCode, playerId);
                }

                // kick player using database
                var success = await _roomService.RemovePlayerFromRoomAsync(roomCode, playerId);
                if (success)
                {
                    // Notify the kicked user specifically
                    await Clients.User(playerId).PlayerKicked(roomCode, $"You have been kicked from room {roomCode}");
                    
                    // Notify all other clients in the room
                    await Clients.Group(roomCode).PlayerLeave(roomCode, playerId);

                    Console.WriteLine($"Player {playerId} was kicked from room {roomCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in KickPlayer: {ex.Message}");
                throw;
            }
        }

        public async Task<object> ContinueAfterDrill(string roomCode)
        {
            try
            {
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    return new { success = false, error = "User not authenticated" };
                }

                // get the room
                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room == null)
                {
                    return new { success = false, error = "Room not found" };
                }

                // check if the user is in the room
                var isPlayerInRoom = await _roomService.IsPlayerInRoomAsync(roomCode, userId);
                if (!isPlayerInRoom)
                {
                    return new { success = false, error = "Player not found in room" };
                }

                // mark player as continued
                await _competitiveDrillService.MarkPlayerContinuedAsync(roomCode, userId);

                // check if all players have continued
                var allContinued = await _competitiveDrillService.HaveAllPlayersContinuedAsync(roomCode);
                
                if (allContinued)
                {
                    // all players continued - transition everyone to lobby
                    if (room.ActiveCompetitiveDrillId != null)
                    {
                        // reset all players for next drill
                        var roomPlayers = await _roomService.GetPlayersInRoomAsync(roomCode);
                        foreach (var player in roomPlayers)
                        {
                            await _competitiveDrillService.ResetPlayerForNextDrillAsync(roomCode, player.UserId);
                            await _roomService.UpdatePlayerReadyStateAsync(roomCode, player.UserId, false);
                        }
                    }
                    
                    // clear the active competitive drill ID and reset room state to Waiting
                    await _roomService.ClearActiveCompetitiveDrillAsync(roomCode);
                    await _roomService.UpdateRoomStateAsync(roomCode, RoomState.Waiting);
    
                    // notify all clients that everyone has continued
                    await Clients.Group(roomCode).AllPlayersContinued(roomCode);
                    
                    Console.WriteLine($"All players continued in room {roomCode}. Transitioning to lobby.");
                }
                else
                {
                    // not all players continued yet - show waiting state
                    var continuedCount = await _competitiveDrillService.GetContinuedPlayerCountAsync(roomCode);
                    var totalCount = await _roomService.GetPlayerCountAsync(roomCode);
                    
                    await Clients.Group(roomCode).WaitingForPlayersToContinue(roomCode, continuedCount, totalCount);
                    
                    Console.WriteLine($"Player {userId} continued in room {roomCode}. Waiting for {totalCount - continuedCount} more players.");
                }

                return new { success = true };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error continuing after drill: {ex.Message}");
                return new { success = false, error = ex.Message };
            }
        }

        private async Task StartCountdown(string roomCode)
        {
            Console.WriteLine($"Starting countdown for room {roomCode}");
            
            // start 3-second countdown
            for (int i = 3; i > 0; i--)
            {
                Console.WriteLine($"Countdown: {i}");
                await Clients.Group(roomCode).Countdown(roomCode, i);
                await Task.Delay(1000);
            }
            
            // show "BEGIN" message
            Console.WriteLine("Countdown: BEGIN");
            await Clients.Group(roomCode).Countdown(roomCode, 0); // 0 indicates "BEGIN"
            await Task.Delay(1000);
            
            Console.WriteLine("Countdown completed");
        }

        private Task StartServerManagedDrillAsync(string roomCode, Room room)
        {
            // start 500ms progress broadcast timer
            lock (_timerLock)
            {
                if (_progressTimers.ContainsKey(roomCode))
                {
                    _progressTimers[roomCode]?.Dispose();
                    _progressTimers.Remove(roomCode);
                }

                _progressTimers[roomCode] = new System.Threading.Timer(async _ =>
                {
                    try
                    {
                        // Get active players from the competitive drill
                        if (room.ActiveCompetitiveDrillId != null)
                        {
                            var competitiveDrill = await _competitiveDrillService.GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                            var activePlayers = competitiveDrill?.Players?.Where(p => p.State != PlayerState.Disconnected).ToList() ?? new List<CompetitiveDrillPlayer>();

                            var allStatistics = activePlayers
                                .Where(p => p.State == PlayerState.Typing || p.State == PlayerState.Finished)
                                .Select(p => new PlayerStatistics
                                {
                                    UserId = p.UserId,
                                    WPM = p.WPM,
                                    Accuracy = p.Accuracy,
                                    WordsCompleted = p.WordsCompleted,
                                    TotalWords = p.TotalWords,
                                    CompletionPercentage = p.CompletionPercentage,
                                    Timestamp = DateTime.UtcNow
                                })
                                .ToList();

                            await Clients.Group(roomCode).PlayerStatisticsUpdate(roomCode, allStatistics);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error broadcasting progress: {ex.Message}");
                    }
                }, null, TimeSpan.Zero, TimeSpan.FromMilliseconds(750)); // Optimized: 750ms for better balance

                // schedule centralized end for both timed and marathon drills
                if (_drillEndTimers.ContainsKey(roomCode))
                {
                    _drillEndTimers[roomCode]?.Dispose();
                    _drillEndTimers.Remove(roomCode);
                }

                if (room.DrillSettings.Type == CompetitiveDrillType.Timed)
                {
                    var duration = Math.Max(1, room.DrillSettings.Duration);
                    _drillEndTimers[roomCode] = new System.Threading.Timer(async _ =>
                    {
                        try
                        {
                            await EndTimedDrillAsync(roomCode);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Error ending timed drill: {ex.Message}");
                        }
                    }, null, TimeSpan.FromSeconds(duration), Timeout.InfiniteTimeSpan);
                }
                else if (room.DrillSettings.Type == CompetitiveDrillType.Marathon)
                {
                    // 10-minute time limit for marathon drills (600 seconds)
                    var marathonTimeLimit = 600;
                    _drillEndTimers[roomCode] = new System.Threading.Timer(async _ =>
                    {
                        try
                        {
                            await EndMarathonDrillAsync(roomCode);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Error ending marathon drill: {ex.Message}");
                        }
                    }, null, TimeSpan.FromSeconds(marathonTimeLimit), Timeout.InfiniteTimeSpan);
                }
            }
            return Task.CompletedTask;
        }

        private async Task EndTimedDrillAsync(string roomCode)
        {
            Console.WriteLine($"Ending timed drill for room {roomCode}");
            
            // stop timers
            StopRoomTimers(roomCode);
            
            // Send end summary and reset room state
            await SendEndSummaryAsync(roomCode);
            
            Console.WriteLine($"Timed drill ended for room {roomCode}");
        }

        private async Task EndMarathonDrillAsync(string roomCode)
        {
            Console.WriteLine($"Ending marathon drill for room {roomCode}");
            
            // stop timers
            StopRoomTimers(roomCode);
            
            // Send end summary and reset room state
            await SendEndSummaryAsync(roomCode);
            
            Console.WriteLine($"Marathon drill ended for room {roomCode}");
        }

        private void StopRoomTimers(string roomCode)
        {
            try
            {
                lock (_timerLock)
                {
                    if (_progressTimers.TryGetValue(roomCode, out var progressTimer))
                    {
                        try
                        {
                            progressTimer?.Dispose();
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Error disposing progress timer for room {roomCode}: {ex.Message}");
                        }
                        _progressTimers.Remove(roomCode);
                    }
                    if (_drillEndTimers.TryGetValue(roomCode, out var endTimer))
                    {
                        try
                        {
                            endTimer?.Dispose();
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Error disposing end timer for room {roomCode}: {ex.Message}");
                        }
                        _drillEndTimers.Remove(roomCode);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error stopping timers for room {roomCode}: {ex.Message}");
            }
        }

        /// <summary>
        /// Clears the in-memory statistics cache for a specific room
        /// </summary>
        private void ClearDrillStatistics(string roomCode)
        {
            lock (_statsLock)
            {
                if (_activeDrillStats.ContainsKey(roomCode))
                {
                    _activeDrillStats.Remove(roomCode);
                    Console.WriteLine($"Cleared statistics cache for room {roomCode}");
                }
            }
        }

        /// <summary>
        /// Initializes the statistics cache for a room when a drill starts
        /// </summary>
        private void InitializeDrillStatistics(string roomCode, List<string> playerIds)
        {
            lock (_statsLock)
            {
                if (!_activeDrillStats.ContainsKey(roomCode))
                {
                    _activeDrillStats[roomCode] = new Dictionary<string, PlayerStatistics>();
                }

                // Initialize all players with zero statistics
                foreach (var playerId in playerIds)
                {
                    if (!_activeDrillStats[roomCode].ContainsKey(playerId))
                    {
                        _activeDrillStats[roomCode][playerId] = new PlayerStatistics
                        {
                            UserId = playerId,
                            WPM = 0,
                            Accuracy = 0,
                            WordsCompleted = 0,
                            TotalWords = 0,
                            CompletionPercentage = 0,
                            Timestamp = DateTime.UtcNow
                        };
                    }
                }

                Console.WriteLine($"Initialized statistics cache for room {roomCode} with {playerIds.Count} players");
            }
        }

        /// <summary>
        /// Gets current statistics from the cache for a specific room
        /// </summary>
        private List<PlayerStatistics> GetCurrentStatistics(string roomCode)
        {
            lock (_statsLock)
            {
                if (_activeDrillStats.ContainsKey(roomCode))
                {
                    return _activeDrillStats[roomCode].Values.ToList();
                }
                return new List<PlayerStatistics>();
            }
        }

        /// <summary>
        /// Gets current statistics for a specific player from the cache
        /// </summary>
        private PlayerStatistics? GetPlayerStatistics(string roomCode, string userId)
        {
            lock (_statsLock)
            {
                if (_activeDrillStats.ContainsKey(roomCode) && _activeDrillStats[roomCode].ContainsKey(userId))
                {
                    return _activeDrillStats[roomCode][userId];
                }
                return null;
            }
        }

        private async Task SendEndSummaryAsync(string roomCode)
        {
            var room = await _roomService.GetRoomByCodeAsync(roomCode);
            if (room == null) return;

            var (playerResults, winnerId, totalPlayers) = await BuildPlayerResultsAsync(room.ActiveCompetitiveDrillId!, room.RoomCode, room.DrillSettings!.Type);
            
            // Update the competitive drill in database with final results
            await UpdateCompetitiveDrillWithFinalResultsAsync(room.ActiveCompetitiveDrillId!, playerResults, winnerId);
            
            var summary = new DrillSummary
            {
                CompetitiveDrillId = room.ActiveCompetitiveDrillId ?? string.Empty,
                RoomId = room.RoomId,
                WinnerId = winnerId,
                StartedAt = DateTime.UtcNow,
                EndedAt = DateTime.UtcNow,
                TotalPlayers = totalPlayers,
                DrillSettings = room.DrillSettings,
                PlayerResults = playerResults
            };

            // Send end drill summary to all clients
            await Clients.Group(roomCode).EndDrill(room.RoomId, summary);

            Console.WriteLine($"Drill completed for room {roomCode}. Final results updated in database.");
        }

        private async Task<(List<PlayerResult> playerResults, string winnerId, int totalPlayers)> BuildPlayerResultsAsync(string competitiveDrillId, string roomCode, CompetitiveDrillType drillType)
        {
            List<PlayerResult> playerResults = new();
            string winnerId = string.Empty;
            int totalPlayers = 0;

            // Get the room code from the competitive drill to access the cache
            var competitiveDrill = await _competitiveDrillService.GetCompetitiveDrillAsync(competitiveDrillId);
            if (competitiveDrill == null) return (playerResults, winnerId, totalPlayers);

            // Get current statistics from the in-memory cache
            var currentStats = GetCurrentStatistics(roomCode);
            if (!currentStats.Any()) return (playerResults, winnerId, totalPlayers);

            totalPlayers = currentStats.Count;
            
            // Determine winner from cached statistics
            var winner = currentStats
                .OrderByDescending(p => p.WPM)
                .ThenByDescending(p => p.Accuracy)
                .FirstOrDefault();
            winnerId = winner?.UserId ?? string.Empty;
            
            // Sort players by performance to calculate final positions
            var sortedStats = currentStats
                .OrderByDescending(p => p.WPM)
                .ThenByDescending(p => p.Accuracy)
                .ToList();
            
            // Build player results with calculated positions
            for (int i = 0; i < sortedStats.Count; i++)
            {
                var stat = sortedStats[i];
                var username = await GetUsernameAsync(stat.UserId);
                var position = i + 1; // 1-based position
                
                // Get additional data from the competitive drill player
                var drillPlayer = competitiveDrill.Players.FirstOrDefault(p => p.UserId == stat.UserId);
                
                // Calculate competitive points based on position and performance
                var competitivePoints = CalculateCompetitivePoints(position, stat.WPM, stat.Accuracy, sortedStats.Count);
                
                // Get user's profile to calculate level information
                var profile = await _profileService.GetByUserId(stat.UserId);
                var previousCompetitivePoints = profile?.CompetitivePoints ?? 0;
                var previousCompetitiveRank = profile != null ? _levelCalculationService.GetCompetitiveRankName(profile.CompetitiveRank) : "Bronze";
                var newCompetitivePoints = previousCompetitivePoints + competitivePoints;
                var newCompetitiveRank = _levelCalculationService.GetCompetitiveRankName(_levelCalculationService.CalculateCompetitiveRank(newCompetitivePoints));
                var hasLeveledUp = previousCompetitiveRank != newCompetitiveRank;
                var pointsToNextRank = _levelCalculationService.GetNextCompetitiveRankThreshold((int)_levelCalculationService.CalculateCompetitiveRank(newCompetitivePoints)) - newCompetitivePoints;
                
                playerResults.Add(new PlayerResult
                {
                    UserId = stat.UserId,
                    Username = username,
                    WPM = stat.WPM,
                    Accuracy = stat.Accuracy,
                    Position = position,
                    PointsChange = competitivePoints,
                    FinishedAt = DateTime.UtcNow,
                    IsWinner = stat.UserId == winnerId,
                    PreviousCompetitivePoints = previousCompetitivePoints,
                    NewCompetitivePoints = newCompetitivePoints,
                    PreviousCompetitiveRank = previousCompetitiveRank,
                    NewCompetitiveRank = newCompetitiveRank,
                    HasLeveledUp = hasLeveledUp,
                    PointsToNextRank = pointsToNextRank
                });
            }

            return (playerResults, winnerId, totalPlayers);
        }

        private string DetermineWinner(List<CompetitiveDrillPlayer> activePlayers)
        {
            var winner = activePlayers
                .OrderByDescending(p => p.WPM)
                .ThenByDescending(p => p.Accuracy)
                .FirstOrDefault();
             
            return winner?.UserId ?? string.Empty;
        }

        private async Task UpdateCompetitiveDrillWithFinalResultsAsync(string competitiveDrillId, List<PlayerResult> playerResults, string winnerId)
        {
            try
            {
                Console.WriteLine($"Updating competitive drill {competitiveDrillId} with final results. Winner: {winnerId}");
                
                var competitiveDrill = await _competitiveDrillService.GetCompetitiveDrillAsync(competitiveDrillId);
                if (competitiveDrill == null)
                {
                    Console.WriteLine($"Competitive drill {competitiveDrillId} not found for final results update");
                    return;
                }

                // Update winner
                competitiveDrill.WinnerId = winnerId;
                competitiveDrill.State = DrillState.Completed;

                // Update each player with final results and calculated points
                foreach (var playerResult in playerResults)
                {
                    var drillPlayer = competitiveDrill.Players.FirstOrDefault(p => p.UserId == playerResult.UserId);
                    if (drillPlayer != null)
                    {
                        // Update final stats
                        drillPlayer.WPM = playerResult.WPM;
                        drillPlayer.Accuracy = playerResult.Accuracy;
                        drillPlayer.Position = playerResult.Position;
                        drillPlayer.State = PlayerState.Finished;
                        
                        // Use the already calculated points from PlayerResult
                        drillPlayer.PointsChange = playerResult.PointsChange;
                        
                        Console.WriteLine($"Player {playerResult.UserId} - Position: {playerResult.Position}, WPM: {playerResult.WPM}, Accuracy: {playerResult.Accuracy}, Points: {playerResult.PointsChange}");
                    }
                }

                // Save updated competitive drill to database
                await _competitiveDrillService.UpdateCompetitiveDrillAsync(competitiveDrill);
                
                // Update user profiles with competitive statistics
                await UpdateUserProfilesWithCompetitiveResultsAsync(playerResults, winnerId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating competitive drill {competitiveDrillId} with final results: {ex.Message}");
            }
        }

        private int CalculateCompetitivePoints(int position, double wpm, double accuracy, int totalPlayers)
        {
            // Base points calculation using existing DrillScorer
            var basePoints = DrillScorer.CalculateUserPoints(DrillType.Competitive, DrillDifficulty.Intermediate, wpm, accuracy);
            
            // Position multiplier (1st place gets full points, others get reduced)
            var positionMultiplier = position switch
            {
                1 => 1.0,    // 1st place: 100% of base points
                2 => 0.8,    // 2nd place: 80% of base points
                3 => 0.6,    // 3rd place: 60% of base points
                _ => 0.4     // 4th+ place: 40% of base points
            };
            
            // Participation bonus for completing the drill
            var participationBonus = 10;
            
            var finalPoints = (int)(basePoints * positionMultiplier) + participationBonus;
            
            Console.WriteLine($"Calculated points for position {position}: base={basePoints}, multiplier={positionMultiplier}, final={finalPoints}");
            
            return Math.Max(0, finalPoints); // Ensure non-negative points
        }

        private async Task UpdateUserProfilesWithCompetitiveResultsAsync(List<PlayerResult> playerResults, string winnerId)
        {
            try
            {
                Console.WriteLine($"Updating user profiles with competitive results. Winner: {winnerId}");
                
                foreach (var playerResult in playerResults)
                {
                    var profile = await _profileService.GetByUserId(playerResult.UserId);
                    if (profile == null)
                    {
                        Console.WriteLine($"Profile not found for user {playerResult.UserId}, skipping profile update");
                        continue;
                    }

                    // Increment total competitive drills
                    profile.CompetitiveDrills++;
                    
                    // Update wins/losses based on position
                    if (playerResult.UserId == winnerId)
                    {
                        profile.Wins++;
                        Console.WriteLine($"User {playerResult.UserId} won the drill");
                    }
                    else
                    {
                        profile.Losses++;
                        Console.WriteLine($"User {playerResult.UserId} lost the drill");
                    }

                    // Update competitive points and rank
                    profile.CompetitivePoints += playerResult.PointsChange;
                    var competitiveRank = _levelCalculationService.CalculateCompetitiveRank(profile.CompetitivePoints);
                    profile.CompetitiveRank = competitiveRank;

                    // Save updated profile
                    await _profileService.UpdateProfilePostCompetitiveDrillAsync(profile);
                    Console.WriteLine($"Updated profile for user {playerResult.UserId}: CompetitiveDrills={profile.CompetitiveDrills}, Wins={profile.Wins}, Losses={profile.Losses}, CompetitivePoints={profile.CompetitivePoints}, Rank={competitiveRank}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating user profiles with competitive results: {ex.Message}");
            }
        }

        private async Task HandlePlayerDisconnect(string userId)
        {
            try
            {
                Console.WriteLine($"Handling disconnect for user: {userId}");
                
                // Get all active rooms to find which one the user was in
                var allRooms = await _roomService.GetAllRoomsAsync();
                
                foreach (var room in allRooms.Where(r => r.IsActive))
                {
                    try
                    {
                        var isPlayerInRoom = await _roomService.IsPlayerInRoomAsync(room.RoomCode, userId);
                        
                        if (isPlayerInRoom)
                        {
                            Console.WriteLine($"Found user {userId} in room {room.RoomCode}");
                            
                            // Stop any active timers for this room to prevent crashes
                            StopRoomTimers(room.RoomCode);
                            
                            // Handle active drill if player disconnects during drill
                            if (room.State == RoomState.InProgress && !string.IsNullOrEmpty(room.ActiveCompetitiveDrillId))
                            {
                                Console.WriteLine($"Player {userId} disconnected during active drill in room {room.RoomCode}");
                                
                                // Mark player as disconnected in the competitive drill
                                var disconnectSuccess = await _competitiveDrillService.MarkPlayerDisconnectedAsync(room.RoomCode, userId);
                                if (!disconnectSuccess)
                                {
                                    Console.WriteLine($"Warning: Failed to mark player {userId} as disconnected in competitive drill");
                                }
                                
                                // Check if all players are now finished
                                var finishedCount = await _competitiveDrillService.GetFinishedPlayerCountAsync(room.RoomCode);
                                var activeCount = await _competitiveDrillService.GetActivePlayerCountAsync(room.RoomCode);
                                
                                if (finishedCount == activeCount)
                                {
                                    Console.WriteLine($"All players finished due to disconnect, ending drill in room {room.RoomCode}");
                                    await EndTimedDrillAsync(room.RoomCode);
                                }
                            }
                            
                            // check if this is the room creator
                            var isCreator = await _roomService.IsPlayerCreatorAsync(room.RoomCode, userId);
                            if (isCreator)
                            {
                                // disband the room if creator disconnects
                                Console.WriteLine($"Room creator {userId} disconnected, disbanding room {room.RoomCode}");
                                
                                try
                                {
                                    // notify all players in the room
                                    await Clients.Group(room.RoomCode).RoomDisbanded(room.RoomId, "Room creator has disconnected");
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine($"Error notifying room disbanded: {ex.Message}");
                                }
                                
                                try
                                {
                                    // deactivate the room
                                    await _roomService.DeactivateRoomAsync(room.RoomCode);
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine($"Error deactivating room: {ex.Message}");
                                }
                            }
                            else
                            {
                                // regular player disconnect - just remove them and notify others
                                try
                                {
                                    await _roomService.RemovePlayerFromRoomAsync(room.RoomCode, userId);
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine($"Error removing player from room: {ex.Message}");
                                }
                                
                                try
                                {
                                    await Clients.Group(room.RoomCode).PlayerLeave(room.RoomId, userId);
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine($"Error notifying player leave: {ex.Message}");
                                }
                                
                                // If room is empty after player removal, clean it up
                                var remainingPlayers = await _roomService.GetPlayersInRoomAsync(room.RoomCode);
                                if (remainingPlayers.Count == 0)
                                {
                                    Console.WriteLine($"Room {room.RoomCode} is empty after disconnect, cleaning up");
                                    try
                                    {
                                        await _roomService.DeactivateRoomAsync(room.RoomCode);
                                        // clear statistics cache
                                        ClearDrillStatistics(room.RoomCode);
                                    }
                                    catch (Exception ex)
                                    {
                                        Console.WriteLine($"Error deactivating empty room: {ex.Message}");
                                    }
                                }
                            }
                            
                            // User can only be in one room, so break after finding them
                            break;
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error handling disconnect for room {room.RoomCode}: {ex.Message}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in HandlePlayerDisconnect: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
            }
        }

        private string? GetUserId()
        {
            // try different claim names that might contain the user ID
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(userId))
                return userId;
                
            userId = Context.User?.FindFirst("sub")?.Value;
            if (!string.IsNullOrEmpty(userId))
                return userId;
                
            userId = Context.User?.FindFirst("nameid")?.Value;
            if (!string.IsNullOrEmpty(userId))
                return userId;
                
            if (Context.User?.Claims != null)
            {
                Console.WriteLine("Available claims:");
                foreach (var claim in Context.User.Claims)
                {
                    Console.WriteLine($"  {claim.Type}: {claim.Value}");
                }
            }
            else
            {
                Console.WriteLine("No claims found in Context.User");
            }
            
            return null;
        }

        private async Task<string> GetUsernameAsync(string userId)
        {
            try
            {
                var user = await _userService.GetByUserId(userId);
                return user?.Username ?? $"User{userId.Substring(0, 4)}";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting username for user {userId}: {ex.Message}");
                return $"User{userId.Substring(0, 4)}";
            }
        }

        private string GetUsername(string userId)
        {
            // Synchronous fallback - use the async version in async methods
            return $"User{userId.Substring(0, 4)}";
        }

        private int GetUserLevel(string userId)
        {
            // TODO
            return 1;
        }

        private async Task<string> GetUserCompetitiveRankAsync(string userId)
        {
            try
            {
                var profile = await _profileService.GetByUserId(userId);
                if (profile == null)
                {
                    return "Bronze";
                }
                
                var rank = _levelCalculationService.CalculateCompetitiveRank(profile.CompetitivePoints);
                return _levelCalculationService.GetCompetitiveRankName(rank);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting competitive rank for user {userId}: {ex.Message}");
                return "Bronze";
            }
        }
    }
}
