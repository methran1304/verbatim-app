using Microsoft.Extensions.Caching.Memory;
using server.Constants;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Entities.Models.DTOs;
using server.Services.Interfaces;

namespace server.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly IMemoryCache _cache;
        private readonly IRoomService _roomService;
        private readonly IUserService _userService;

        public PlayerService(IMemoryCache cache, IRoomService roomService, IUserService userService)
        {
            _cache = cache;
            _roomService = roomService;
            _userService = userService;
        }

        public bool AddPlayerToRoom(string roomCode, string userId)
        {
            try
            {
                // check if room exists
                var room = _roomService.GetRoomByCodeAsync(roomCode).Result;
                if (room == null)
                {
                    Console.WriteLine($"Room not found: {roomCode}");
                    return false;
                }

                // check if player is already in the room
                var existingPlayers = GetPlayersInRoomFromCache(roomCode);
                if (existingPlayers.Any(p => p.UserId == userId))
                {
                    Console.WriteLine($"Player {userId} is already in room {roomCode}");
                    return false;
                }

                // check room capacity
                if (existingPlayers.Count >= 4)
                {
                    Console.WriteLine($"Room {roomCode} is full (4 players)");
                    return false;
                }

                // add player to room
                var newPlayer = new CompetitiveDrillPlayer
                {
                    UserId = userId,
                    WPM = 0,
                    Accuracy = 0,
                    Position = existingPlayers.Count + 1,
                    PointsChange = 0,
                    State = PlayerState.Connected
                };

                existingPlayers.Add(newPlayer);
                SetPlayersInRoomCache(roomCode, existingPlayers);

                Console.WriteLine($"Player {userId} added to room {roomCode}");
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding player to room: {ex.Message}");
                return false;
            }
        }

        public bool RemovePlayerFromRoom(string roomCode, string userId)
        {
            try
            {
                var players = GetPlayersInRoomFromCache(roomCode);
                var player = players.FirstOrDefault(p => p.UserId == userId);
                
                if (player == null)
                {
                    Console.WriteLine($"Player {userId} not found in room {roomCode}");
                    return false;
                }

                players.Remove(player);
                SetPlayersInRoomCache(roomCode, players);

                Console.WriteLine($"Player {userId} removed from room {roomCode}");
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error removing player from room: {ex.Message}");
                return false;
            }
        }

        public List<CompetitiveDrillPlayer> GetPlayersInRoom(string roomCode)
        {
            return GetPlayersInRoomFromCache(roomCode);
        }

        public bool UpdatePlayerStatistics(string roomCode, string userId, PlayerStatistics stats)
        {
            var players = GetPlayersInRoomFromCache(roomCode);
            var player = players.FirstOrDefault(p => p.UserId == userId);
            
            if (player != null)
            {
                player.WPM = stats.WPM;
                player.Accuracy = stats.Accuracy;
                player.WordsCompleted = stats.WordsCompleted;
                player.TotalWords = stats.TotalWords;
                player.CompletionPercentage = (int)Math.Round(stats.CompletionPercentage);
                SetPlayersInRoomCache(roomCode, players);
                
                // record activity for AFK detection
                RecordActivity(roomCode, userId);
                
                return true;
            }
            return false;
        }

        public bool IsPlayerInRoom(string roomCode, string userId)
        {
            var players = GetPlayersInRoomFromCache(roomCode);
            return players.Any(p => p.UserId == userId);
        }

        public CompetitiveDrillPlayer? GetPlayer(string roomCode, string userId)
        {
            var players = GetPlayersInRoomFromCache(roomCode);
            return players.FirstOrDefault(p => p.UserId == userId);
        }

        public bool SetPlayerReady(string roomCode, string userId, bool isReady = true)
        {
            try
            {
                var players = GetPlayersInRoomFromCache(roomCode);
                var player = players.FirstOrDefault(p => p.UserId == userId);
                
                if (player == null)
                {
                    Console.WriteLine($"Player {userId} not found in room {roomCode}");
                    return false;
                }

                player.State = isReady ? PlayerState.Ready : PlayerState.Connected;
                SetPlayersInRoomCache(roomCode, players);

                Console.WriteLine($"Player {userId} {(isReady ? "ready" : "unready")} status set in room {roomCode}");
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error setting player ready status: {ex.Message}");
                return false;
            }
        }

        public bool StartPlayerTyping(string roomCode, string userId)
        {
            var players = GetPlayersInRoomFromCache(roomCode);
            var player = players.FirstOrDefault(p => p.UserId == userId);
            
            if (player != null)
            {
                player.State = PlayerState.Typing;
                SetPlayersInRoomCache(roomCode, players);
                
                // record initial activity when player starts typing
                RecordActivity(roomCode, userId);
                
                return true;
            }
            return false;
        }

        public bool KickPlayerFromLobby(string roomCode, string userId, string kickedByUserId)
        {
            // only room creator can kick players
            var room = _roomService.GetRoomByCodeAsync(roomCode).Result;
            if (room?.CreatedBy != kickedByUserId)
                return false;

            // can't kick yourself
            if (userId == kickedByUserId)
                return false;

            // can only kick players in lobby (not during drill)
            if (room.State != RoomState.Waiting)
                return false;

            return RemovePlayerFromRoom(roomCode, userId);
        }

        public bool SetPlayerFinished(string roomCode, string userId, DrillResult result)
        {
            var players = GetPlayersInRoomFromCache(roomCode);
            var player = players.FirstOrDefault(p => p.UserId == userId);
            
            if (player != null)
            {
                player.WPM = result.WPM;
                player.Accuracy = result.Accuracy;
                player.Position = result.Position;
                player.PointsChange = result.PointsChange;
                player.State = PlayerState.Finished;
                SetPlayersInRoomCache(roomCode, players);
                return true;
            }
            return false;
        }

        public List<CompetitiveDrillPlayer> GetReadyPlayers(string roomCode)
        {
            var players = GetPlayersInRoomFromCache(roomCode);
            return players.Where(p => p.State == PlayerState.Ready).ToList();
        }

		public bool AreAllPlayersReady(string roomCode)
		{
			var players = GetPlayersInRoomFromCache(roomCode);
			return players.Count > 0 && players.All(p => p.State == PlayerState.Ready);
		}

		public int GetPlayerCount(string roomCode)
		{
			var players = GetPlayersInRoomFromCache(roomCode);
			return players.Count;
		}

		// private cache methods
		private List<CompetitiveDrillPlayer> GetPlayersInRoomFromCache(string roomCode)
        {
            var cacheKey = $"room_players_{roomCode}";
            var players = _cache.Get<List<CompetitiveDrillPlayer>>(cacheKey);
            return players ?? new List<CompetitiveDrillPlayer>();
        }

        private void SetPlayersInRoomCache(string roomCode, List<CompetitiveDrillPlayer> players)
        {
            var cacheKey = $"room_players_{roomCode}";
            _cache.Set(cacheKey, players, TimeSpan.FromHours(1));
        }

        private void RecordActivity(string roomCode, string userId)
        {
            var key = $"activity:{roomCode}:{userId}";
            _cache.Set(key, DateTime.UtcNow, TimeSpan.FromHours(2));
        }

        public bool SetPlayerAFK(string roomCode, string userId, bool isAFK)
        {
            try
            {
                var players = GetPlayersInRoomFromCache(roomCode);
                var player = players.FirstOrDefault(p => p.UserId == userId);
                
                if (player == null)
                {
                    Console.WriteLine($"Player {userId} not found in room {roomCode}");
                    return false;
                }

                // update player's AFK status
                player.IsAFK = isAFK;

                // update cache
                SetPlayersInRoomCache(roomCode, players);

                Console.WriteLine($"Set player {userId} AFK status to {isAFK} in room {roomCode}");
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error setting player AFK status: {ex.Message}");
                return false;
            }
        }

    }
} 