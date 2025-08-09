using Microsoft.AspNetCore.SignalR;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services;
using server.Services.Interfaces;
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
        Task PlayerJoin(string roomId, string userId, string username, int level, bool isCreator = false);
        Task PlayerJoinWithState(string roomId, string userId, string username, int level, bool isCreator, string state);
        Task PlayerLeave(string roomId, string userId);
        Task PlayerReady(string roomId, string userId);
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
    }

    public class CompetitiveDrillHub : Hub<ICompetitiveDrillClient>
    {
        private readonly ICompetitiveDrillOrchestrator _orchestrator;
        private readonly IRoomService _roomService;
        private readonly IPlayerService _playerService;
        private readonly ICompetitiveDrillService _competitiveDrillService;
        private readonly IAFKDetectionService _afkDetectionService;
        private readonly IDrillTextService _drillTextService;
        private readonly IUserService _userService;
        
        // track countdown state to prevent multiple countdowns
        private static readonly Dictionary<string, bool> _countdownInProgress = new();
        // track per-room progress broadcast timers (500ms) and end-of-drill timers
        private static readonly Dictionary<string, System.Threading.Timer> _progressTimers = new();
        private static readonly Dictionary<string, System.Threading.Timer> _drillEndTimers = new();
        private static readonly object _timerLock = new();
        public CompetitiveDrillHub(
            ICompetitiveDrillOrchestrator orchestrator,
            IRoomService roomService,
            IPlayerService playerService,
            ICompetitiveDrillService competitiveDrillService,
            IAFKDetectionService afkDetectionService,
            IDrillTextService drillTextService,
            IUserService userService)
        {
            _orchestrator = orchestrator;
            _roomService = roomService;
            _playerService = playerService;
            _competitiveDrillService = competitiveDrillService;
            _afkDetectionService = afkDetectionService;
            _drillTextService = drillTextService;
            _userService = userService;
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
            Console.WriteLine($"Client disconnected: {Context.ConnectionId}");
            
            // handle player disconnect
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(userId))
            {
                // find which room the player was in and remove them
                // this is a simplified approach - in production you'd want to track room membership
                await HandlePlayerDisconnect(userId);
            }
            
            await base.OnDisconnectedAsync(exception);
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

                // create room
                var room = await _roomService.CreateRoomAsync(userId, settings);
                Console.WriteLine($"Room created: {room.RoomCode} by user {userId}");
                
                // add creator to room
                var success = _playerService.AddPlayerToRoom(room.RoomCode, userId);
                if (!success)
                {
                    return new { success = false, error = "Failed to add player to room" };
                }



                // add connection to group
                await Groups.AddToGroupAsync(Context.ConnectionId, room.RoomCode);

                // notify all clients in the room
                await Clients.Group(room.RoomCode).RoomCreated(room.RoomId, room.RoomCode);

                // notify about the room creator joining
                var username = await GetUsernameAsync(userId);
                var level = GetUserLevel(userId);
                await Clients.Group(room.RoomCode).PlayerJoin(room.RoomId, userId, username, level, true); // true = isCreator

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
            Console.WriteLine($"=== JOIN ROOM DEBUG START ===");
            Console.WriteLine($"JoinRoom called with roomCode: '{roomCode}'");
            Console.WriteLine($"Connection ID: {Context.ConnectionId}");
            Console.WriteLine($"User Claims: {string.Join(", ", Context.User?.Claims.Select(c => $"{c.Type}={c.Value}") ?? new string[0])}");
            
            try
            {
                var userId = GetUserId();
                Console.WriteLine($"Extracted userId: '{userId}'");
                
                if (string.IsNullOrEmpty(userId))
                {
                    Console.WriteLine("ERROR: User not authenticated - userId is null or empty");
                    return new { success = false, error = "User not authenticated" };
                }

                Console.WriteLine($"Attempting to get room with code: '{roomCode}'");
                // get room and validate
                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room == null)
                {
                    Console.WriteLine($"ERROR: Room not found for code: '{roomCode}'");
                    return new { success = false, error = "Room not found" };
                }

                Console.WriteLine($"Room found: RoomId={room.RoomId}, RoomCode={room.RoomCode}, State={room.State}, CreatedBy={room.CreatedBy}, IsActive={room.IsActive}");
                
                if (room.State != RoomState.Waiting && room.State != RoomState.Ready)
                {
                    Console.WriteLine($"ERROR: Room state '{room.State}' is not accepting new players");
                    return new { success = false, error = "Room is not accepting new players" };
                }

                Console.WriteLine($"Room state is valid. Attempting to add player {userId} to room {roomCode}");
                // add player to room
                var success = _playerService.AddPlayerToRoom(roomCode, userId);
                Console.WriteLine($"AddPlayerToRoom result: {success}");
                
                if (!success)
                {
                    Console.WriteLine($"ERROR: Failed to add player {userId} to room {roomCode}");
                    return new { success = false, error = "Failed to join room" };
                }

                Console.WriteLine($"Adding connection {Context.ConnectionId} to group {roomCode}");
                // add connection to group
                await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
                Console.WriteLine($"Successfully added connection to group");

                // send current player list to the joining player
                var currentPlayers = _playerService.GetPlayersInRoom(roomCode);
                Console.WriteLine($"Current players in room {roomCode}: {currentPlayers.Count}");
                foreach (var player in currentPlayers)
                {
                    var playerUsername = await GetUsernameAsync(player.UserId);
                    var playerLevel = GetUserLevel(player.UserId);
                    var isPlayerCreator = room.CreatedBy == player.UserId;
                    var playerState = player.State.ToString();
                    Console.WriteLine($"Sending existing player to joining user: userId={player.UserId}, username={playerUsername}, level={playerLevel}, state={player.State}, isCreator={isPlayerCreator}");
                    await Clients.Caller.PlayerJoinWithState(room.RoomId, player.UserId, playerUsername, playerLevel, isPlayerCreator, playerState);
                }

                // notify all clients in the room about the new player
                var username = await GetUsernameAsync(userId);
                var level = GetUserLevel(userId);
                var isNewPlayerCreator = room.CreatedBy == userId;
                Console.WriteLine($"Notifying group {roomCode} of player join: userId={userId}, username={username}, level={level}, isCreator={isNewPlayerCreator}");
                await Clients.Group(roomCode).PlayerJoin(room.RoomId, userId, username, level, isNewPlayerCreator);
                Console.WriteLine($"Successfully notified group of player join");
                
                // notify the joining player specifically
                Console.WriteLine($"Notifying caller of room joined: roomId={room.RoomId}, roomCode={roomCode}");
                await Clients.Caller.RoomJoined(room.RoomId, roomCode);
                Console.WriteLine($"Successfully notified caller of room joined");

                Console.WriteLine($"SUCCESS: User {userId} joined room {roomCode}");
                Console.WriteLine($"=== JOIN ROOM DEBUG END ===");
                return new { success = true, roomId = room.RoomId, roomCode = room.RoomCode };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR in JoinRoom: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                Console.WriteLine($"=== JOIN ROOM DEBUG END (ERROR) ===");
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

                // remove player from room
                var success = _playerService.RemovePlayerFromRoom(roomCode, userId);
                if (!success)
                {
                    return new { success = false, error = "Failed to leave room" };
                }

                // if the room is empty, delete it
                if (_playerService.GetPlayerCount(roomCode) == 0)
                {
                    Console.WriteLine($"Room {roomCode} is empty, deleting room");
                    await _roomService.DeleteRoomAsync(roomCode, userId);
                }



                // remove connection from group
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomCode);

                Console.WriteLine($"User {userId} left room {roomCode}");

                // notify all clients in the room
                await Clients.Group(roomCode).PlayerLeave(roomCode, userId);

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

                // set player ready status
                var success = _playerService.SetPlayerReady(roomCode, userId, isReady);
                if (!success)
                {
                    return new { success = false, error = "Failed to set ready status" };
                }



                // notify all clients in the room
                await Clients.Group(roomCode).PlayerReady(roomCode, userId);

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

                // update player statistics
                var success = _playerService.UpdatePlayerStatistics(roomCode, userId, statistics);
                if (success)
                {
                    // get all players' current statistics
                    var players = _playerService.GetPlayersInRoom(roomCode);
                    var allStatistics = players
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

                    // notify all clients in the room
                    await Clients.Group(roomCode).PlayerStatisticsUpdate(roomCode, allStatistics);
                }
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

                // update player AFK status
                var success = _playerService.SetPlayerAFK(roomCode, userId, isAFK);
                if (success)
                {
                    // notify all clients in the room about the AFK status change
                    if (isAFK)
                    {
                        await Clients.Group(roomCode).PlayerAFK(roomCode, userId);
                    }
                    // note: We don't send a specific "not AFK" event since that's handled by regular activity
                }
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
                var drillText = _drillTextService.GetDrillTextForRoom(roomCode);
                if (drillText == null || drillText.Count == 0)
                {
                    drillText = _drillTextService.GenerateDrillText(room.DrillSettings);
                    _drillTextService.SetDrillTextForRoom(roomCode, drillText);
                }
                Console.WriteLine($"Using drill text with {drillText.Count} words");

                // ensure all players are ready BEFORE switching to typing
                if (!_playerService.AreAllPlayersReady(roomCode))
                {
                    Console.WriteLine($"ERROR: Not all players are ready in room {roomCode}");
                    return new { success = false, error = "All players must be ready" };
                }

                // update all players to typing state
                var players = _playerService.GetPlayersInRoom(roomCode);
                foreach (var player in players)
                {
                    _playerService.StartPlayerTyping(roomCode, player.UserId);
                }

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
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    throw new UnauthorizedAccessException("User not authenticated");
                }

                // handle player completion
                var success = await _orchestrator.HandlePlayerCompletionAsync(roomCode, userId, result);
                if (success)
                {
                    Console.WriteLine($"Drill completion condition met for room {roomCode}. Sending summary and stopping timers.");
                    StopRoomTimers(roomCode);
                    await SendEndSummaryAsync(roomCode);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in CompleteDrill: {ex.Message}");
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

                // kick player
                var success = _playerService.KickPlayerFromLobby(roomCode, playerId, userId);
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
                        var players = _playerService.GetPlayersInRoom(roomCode);
                        var allStatistics = players
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
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error broadcasting progress: {ex.Message}");
                    }
                }, null, TimeSpan.Zero, TimeSpan.FromMilliseconds(500));

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
            // stop timers
            StopRoomTimers(roomCode);
            await SendEndSummaryAsync(roomCode);
        }

        private async Task EndMarathonDrillAsync(string roomCode)
        {
            // stop timers
            StopRoomTimers(roomCode);
            await SendEndSummaryAsync(roomCode);
        }

        private void StopRoomTimers(string roomCode)
        {
            lock (_timerLock)
            {
                if (_progressTimers.TryGetValue(roomCode, out var progressTimer))
                {
                    progressTimer.Dispose();
                    _progressTimers.Remove(roomCode);
                }
                if (_drillEndTimers.TryGetValue(roomCode, out var endTimer))
                {
                    endTimer.Dispose();
                    _drillEndTimers.Remove(roomCode);
                }
            }
        }

        private async Task SendEndSummaryAsync(string roomCode)
        {
            var room = await _roomService.GetRoomByCodeAsync(roomCode);
            if (room == null) return;

            var players = _playerService.GetPlayersInRoom(roomCode);
            var activePlayers = players.Where(p => p.State != PlayerState.Disconnected).ToList();
            var winner = activePlayers
                .OrderByDescending(p => p.WPM)
                .ThenByDescending(p => p.Accuracy)
                .FirstOrDefault();

            var winnerId = winner?.UserId ?? string.Empty;

            var summary = new DrillSummary
            {
                CompetitiveDrillId = room.ActiveCompetitiveDrillId ?? string.Empty,
                RoomId = room.RoomId,
                WinnerId = winnerId,
                StartedAt = DateTime.UtcNow,
                EndedAt = DateTime.UtcNow,
                TotalPlayers = activePlayers.Count,
                DrillSettings = room.DrillSettings,
                PlayerResults = new List<PlayerResult>()
            };

            foreach (var p in activePlayers)
            {
                var username = await GetUsernameAsync(p.UserId);
                summary.PlayerResults.Add(new PlayerResult
                {
                    UserId = p.UserId,
                    Username = username,
                    WPM = p.WPM,
                    Accuracy = p.Accuracy,
                    Position = 0,
                    PointsChange = 0,
                    FinishedAt = DateTime.UtcNow,
                    IsWinner = p.UserId == winnerId
                });
            }

            await Clients.Group(roomCode).EndDrill(room.RoomId, summary);
        }

        private async Task HandlePlayerDisconnect(string userId)
        {
            try
            {
                Console.WriteLine($"Handling disconnect for player {userId}");
                
                // get all active rooms and check if this user is in any of them
                var allRooms = await _roomService.GetAllRoomsAsync();
                
                foreach (var room in allRooms.Where(r => r.IsActive))
                {
                    var players = _playerService.GetPlayersInRoom(room.RoomCode);
                    var disconnectedPlayer = players.FirstOrDefault(p => p.UserId == userId);
                    
                    if (disconnectedPlayer != null)
                    {
                        Console.WriteLine($"Found user {userId} in room {room.RoomCode}");
                        
                        // check if this is the room creator
                        if (room.CreatedBy == userId)
                        {
                            // disband the room if creator disconnects
                            Console.WriteLine($"Room creator {userId} disconnected, disbanding room {room.RoomCode}");
                            
                            // notify all players in the room
                            await Clients.Group(room.RoomCode).RoomDisbanded(room.RoomId, "Room creator has disconnected");
                            
                            // deactivate the room
                            await _roomService.DeactivateRoomAsync(room.RoomCode);
                            

                        }
                        else
                        {
                            // regular player disconnect - just remove them and notify others
                            _playerService.RemovePlayerFromRoom(room.RoomCode, userId);
                            await Clients.Group(room.RoomCode).PlayerLeave(room.RoomId, userId);
                            

                        }
                        
                        // remove from SignalR group
                        await Groups.RemoveFromGroupAsync(Context.ConnectionId, room.RoomCode);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error handling player disconnection: {ex.Message}");
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
    }
}