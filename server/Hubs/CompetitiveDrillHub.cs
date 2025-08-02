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

        public CompetitiveDrillHub(
            ICompetitiveDrillOrchestrator orchestrator,
            IRoomService roomService,
            IPlayerService playerService,
            ICompetitiveDrillService competitiveDrillService,
            IAFKDetectionService afkDetectionService,
            IDrillTextService drillTextService)
        {
            _orchestrator = orchestrator;
            _roomService = roomService;
            _playerService = playerService;
            _competitiveDrillService = competitiveDrillService;
            _afkDetectionService = afkDetectionService;
            _drillTextService = drillTextService;
        }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"Client connected: {Context.ConnectionId}");
            await base.OnConnectedAsync();
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

        public async Task JoinRoom(string roomCode)
        {
            try
            {
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    throw new UnauthorizedAccessException("User not authenticated");
                }

                // get room and validate
                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room == null)
                {
                    throw new ArgumentException("Room not found");
                }

                if (room.State != RoomState.Waiting && room.State != RoomState.Ready)
                {
                    throw new InvalidOperationException("Room is not accepting new players");
                }

                // add player to room
                var success = _playerService.AddPlayerToRoom(roomCode, userId);
                if (!success)
                {
                    throw new InvalidOperationException("Failed to join room");
                }

                // add to signalr group
                await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

                // get user info (you'll need to implement this based on your auth system)
                var username = GetUsername(userId);
                var level = GetUserLevel(userId);

                // notify all clients in the room
                await Clients.Group(roomCode).PlayerJoin(roomCode, userId, username, level);

                // update room availability if needed
                if (_roomService.IsRoomFullAsync(roomCode).Result)
                {
                    await _roomService.UpdateRoomAvailabilityAsync(roomCode, RoomAvailability.Full);
                }

                Console.WriteLine($"Player {userId} joined room {roomCode}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in JoinRoom: {ex.Message}");
                throw;
            }
        }

        public async Task LeaveRoom(string roomCode)
        {
            try
            {
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    throw new UnauthorizedAccessException("User not authenticated");
                }

                // remove player from room
                var success = _playerService.RemovePlayerFromRoom(roomCode, userId);
                if (success)
                {
                    // remove from signalr group
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomCode);

                    // notify all clients in the room
                    await Clients.Group(roomCode).PlayerLeave(roomCode, userId);

                    // update room availability
                    await _roomService.UpdateRoomAvailabilityAsync(roomCode, RoomAvailability.Available);

                    Console.WriteLine($"Player {userId} left room {roomCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in LeaveRoom: {ex.Message}");
                throw;
            }
        }

        public async Task SetPlayerReady(string roomCode, bool isReady)
        {
            try
            {
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    throw new UnauthorizedAccessException("User not authenticated");
                }

                var success = _playerService.SetPlayerReady(roomCode, userId);
                if (success)
                {
                    // notify all clients in the room
                    await Clients.Group(roomCode).PlayerReady(roomCode, userId);

                    // check if all players are ready
                    if (_playerService.AreAllPlayersReady(roomCode))
                    {
                        await _roomService.UpdateRoomStateAsync(roomCode, RoomState.Ready);
                    }

                    Console.WriteLine($"Player {userId} set ready state to {isReady} in room {roomCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SetPlayerReady: {ex.Message}");
                throw;
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
            return Context.User?.FindFirst("sub")?.Value;
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