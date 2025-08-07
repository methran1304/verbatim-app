using Microsoft.AspNetCore.SignalR;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services;
using server.Services.Interfaces;

namespace server.Hubs
{
    public interface ICompetitiveDrillClient
    {
        // room management
        Task RoomCreated(string roomId, string roomCode);
        Task RoomJoined(string roomId, string roomCode);
        
        // player management
        Task PlayerJoin(string roomId, string userId, string username, int level);
        Task PlayerLeave(string roomId, string userId);
        Task PlayerReady(string roomId, string userId);
        Task PlayerStatisticsUpdate(string roomId, List<PlayerStatistics> statistics);
        Task AllPlayersCompleted(string roomId);

        // drill lifecycle
        Task StartDrill(string roomId, List<string> drillText);
        Task EndDrill(string roomId, DrillSummary results);
        Task WaitingForOtherPlayers(int finishedCount, int totalCount);
        
        // misc
        Task PlayerAFK(string roomId, string userId);
        Task AFKWarning(string roomId, string userId, int timeoutSeconds);
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
        private readonly IUserRoomSessionService _sessionService;

        public CompetitiveDrillHub(
            ICompetitiveDrillOrchestrator orchestrator,
            IRoomService roomService,
            IPlayerService playerService,
            ICompetitiveDrillService competitiveDrillService,
            IAFKDetectionService afkDetectionService,
            IDrillTextService drillTextService,
            IUserRoomSessionService sessionService)
        {
            _orchestrator = orchestrator;
            _roomService = roomService;
            _playerService = playerService;
            _competitiveDrillService = competitiveDrillService;
            _afkDetectionService = afkDetectionService;
            _drillTextService = drillTextService;
            _sessionService = sessionService;
        }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"Client connected: {Context.ConnectionId}");
            await base.OnConnectedAsync();
        }

        // Test method to verify SignalR communication
        public string TestConnection()
        {
            var userId = GetUserId();
            return $"Connection test successful. User ID: {userId}";
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            Console.WriteLine($"Client disconnected: {Context.ConnectionId}");
            
            // handle player disconnect
            var userId = Context.User?.FindFirst("sub")?.Value;
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

                // create session for room creator
                await _sessionService.CreateSessionAsync(userId, room.RoomCode, UserRole.Creator);

                // add connection to group
                await Groups.AddToGroupAsync(Context.ConnectionId, room.RoomCode);

                // notify all clients in the room
                await Clients.Group(room.RoomCode).RoomCreated(room.RoomId, room.RoomCode);

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

                // get room and validate
                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room == null)
                {
                    return new { success = false, error = "Room not found" };
                }

                if (room.State != RoomState.Waiting && room.State != RoomState.Ready)
                {
                    return new { success = false, error = "Room is not accepting new players" };
                }

                // add player to room
                var success = _playerService.AddPlayerToRoom(roomCode, userId);
                if (!success)
                {
                    return new { success = false, error = "Failed to join room" };
                }

                // create session for room member
                await _sessionService.CreateSessionAsync(userId, roomCode, UserRole.Member);

                // add connection to group
                await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

                        // notify all clients in the room
        var username = GetUsername(userId);
        var level = GetUserLevel(userId);
        await Clients.Group(roomCode).PlayerJoin(room.RoomId, userId, username, level);
        
        // notify the joining player specifically
        await Clients.Caller.RoomJoined(room.RoomId, roomCode);

                Console.WriteLine($"User {userId} joined room {roomCode}");
                return new { success = true, roomId = room.RoomId, roomCode = room.RoomCode };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error joining room: {ex.Message}");
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

                // clear user session
                await _sessionService.ClearSessionAsync(userId);

                // remove connection from group
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomCode);

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
                var success = _playerService.SetPlayerReady(roomCode, userId);
                if (!success)
                {
                    return new { success = false, error = "Failed to set ready status" };
                }

                // update activity on significant events
                await _sessionService.UpdateActivityAsync(userId);

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
                    // Update activity only on significant events, not every keystroke
                    await _sessionService.UpdateActivityAsync(userId);

                    // get all players' current statistics
                    var players = _playerService.GetPlayersInRoom(roomCode);
                    var allStatistics = players
                        .Where(p => p.State == PlayerState.Typing)
                        .Select(p => new PlayerStatistics
                        {
                            UserId = p.UserId,
                            WPM = p.WPM,
                            Accuracy = p.Accuracy,
                            WordsCompleted = statistics.WordsCompleted, // this should be calculated properly
                            TotalWords = statistics.TotalWords,
                            CompletionPercentage = statistics.CompletionPercentage,
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

        public async Task StartDrill(string roomCode)
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
                    throw new UnauthorizedAccessException("Only room creator can start drill");
                }

                // start the drill using orchestrator
                var success = await _orchestrator.StartDrillAsync(roomCode);
                if (success)
                {
                    // get drill text for the room
                    var drillText = _drillTextService.GenerateDrillText(room.DrillSettings);

                    
                    
                    // notify all clients in the room
                    await Clients.Group(roomCode).StartDrill(roomCode, drillText);

                    // start countdown
                    await StartCountdown(roomCode);

                    Console.WriteLine($"Drill started in room {roomCode}");
                }
                else
                {
                    throw new InvalidOperationException("Failed to start drill");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in StartDrill: {ex.Message}");
                throw;
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
                    // Update activity on drill completion
                    await _sessionService.UpdateActivityAsync(userId);
                    Console.WriteLine($"Player {userId} completed drill in room {roomCode}");
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
                    // Notify all clients in the room
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
            // start 5-second countdown
            for (int i = 5; i > 0; i--)
            {
                await Clients.Group(roomCode).Countdown(roomCode, i);
                await Task.Delay(1000);
            }
        }

        private Task HandlePlayerDisconnect(string userId)
        {
            // this is a simplified approach - in production you'd want to track room membership
            // for now, we'll just log the disconnect
            Console.WriteLine($"Player {userId} disconnected");
            return Task.CompletedTask;
        }

        private string? GetUserId()
        {
            // try different claim names that might contain the user ID
            var userId = Context.User?.FindFirst("sub")?.Value;
            if (!string.IsNullOrEmpty(userId))
                return userId;
                
            userId = Context.User?.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
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

        private string GetUsername(string userId)
        {
            // TODO
            return $"User{userId.Substring(0, 4)}";
        }

        private int GetUserLevel(string userId)
        {
            // TODO
            return 1;
        }
    }
}