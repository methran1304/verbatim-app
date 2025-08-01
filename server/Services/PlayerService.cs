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

        public bool AddPlayerToRoom(string roomId, string userId)
        {
            var players = GetPlayersInRoomFromCache(roomId);
            
            if (players.Any(p => p.UserId == userId))
                return false;

            var newPlayer = new CompetitiveDrillPlayer
            {
                UserId = userId,
                WPM = 0,
                Accuracy = 0,
                Position = players.Count + 1,
                PointsChange = 0,
                State = PlayerState.Connected
            };

            players.Add(newPlayer);
            SetPlayersInRoomCache(roomId, players);
            
            return true;
        }

        public bool RemovePlayerFromRoom(string roomId, string userId)
        {
            var players = GetPlayersInRoomFromCache(roomId);
            var player = players.FirstOrDefault(p => p.UserId == userId);
            
            if (player == null)
                return false;

            players.Remove(player);
            SetPlayersInRoomCache(roomId, players);
            
            return true;
        }

        public List<CompetitiveDrillPlayer> GetPlayersInRoom(string roomId)
        {
            return GetPlayersInRoomFromCache(roomId);
        }

        public bool UpdatePlayerStatistics(string roomId, string userId, PlayerStatistics stats)
        {
            var players = GetPlayersInRoomFromCache(roomId);
            var player = players.FirstOrDefault(p => p.UserId == userId);
            
            if (player != null)
            {
                player.WPM = stats.WPM;
                player.Accuracy = stats.Accuracy;
                SetPlayersInRoomCache(roomId, players);
                
                // Record activity for AFK detection
                RecordActivity(roomId, userId);
                
                return true;
            }
            return false;
        }

        public bool IsPlayerInRoom(string roomId, string userId)
        {
            var players = GetPlayersInRoomFromCache(roomId);
            return players.Any(p => p.UserId == userId);
        }

        public CompetitiveDrillPlayer? GetPlayer(string roomId, string userId)
        {
            var players = GetPlayersInRoomFromCache(roomId);
            return players.FirstOrDefault(p => p.UserId == userId);
        }

        public bool SetPlayerReady(string roomId, string userId)
        {
            var players = GetPlayersInRoomFromCache(roomId);
            var player = players.FirstOrDefault(p => p.UserId == userId);
            
            if (player != null)
            {
                player.State = PlayerState.Ready;
                SetPlayersInRoomCache(roomId, players);
                return true;
            }
            return false;
        }

        public bool StartPlayerTyping(string roomId, string userId)
        {
            var players = GetPlayersInRoomFromCache(roomId);
            var player = players.FirstOrDefault(p => p.UserId == userId);
            
            if (player != null)
            {
                player.State = PlayerState.Typing;
                SetPlayersInRoomCache(roomId, players);
                
                // Record initial activity when player starts typing
                RecordActivity(roomId, userId);
                
                return true;
            }
            return false;
        }

        public bool KickPlayerFromLobby(string roomId, string userId, string kickedByUserId)
        {
            // only room creator can kick players
            var room = _roomService.GetRoomByIdAsync(roomId).Result;
            if (room?.CreatedBy != kickedByUserId)
                return false;

            // can't kick yourself
            if (userId == kickedByUserId)
                return false;

            // can only kick players in lobby (not during drill)
            if (room.State != RoomState.Waiting && room.State != RoomState.Ready)
                return false;

            return RemovePlayerFromRoom(roomId, userId);
        }

        public bool SetPlayerFinished(string roomId, string userId, DrillResult result)
        {
            var players = GetPlayersInRoomFromCache(roomId);
            var player = players.FirstOrDefault(p => p.UserId == userId);
            
            if (player != null)
            {
                player.WPM = result.WPM;
                player.Accuracy = result.Accuracy;
                player.Position = result.Position;
                player.PointsChange = result.PointsChange;
                player.State = PlayerState.Finished;
                SetPlayersInRoomCache(roomId, players);
                return true;
            }
            return false;
        }

        public List<CompetitiveDrillPlayer> GetReadyPlayers(string roomId)
        {
            var players = GetPlayersInRoomFromCache(roomId);
            return players.Where(p => p.State == PlayerState.Ready).ToList();
        }

		public bool AreAllPlayersReady(string roomId)
		{
			var players = GetPlayersInRoomFromCache(roomId);
			return players.Count > 0 && players.All(p => p.State == PlayerState.Ready);
		}

		public int GetPlayerCount(string roomId)
		{
			var players = GetPlayersInRoomFromCache(roomId);
			return players.Count;
		}

		// Private cache methods
		private List<CompetitiveDrillPlayer> GetPlayersInRoomFromCache(string roomId)
        {
            var cacheKey = string.Format(CachePatternConstants.RoomPlayers, roomId);
            _cache.TryGetValue(cacheKey, out List<CompetitiveDrillPlayer>? players);
            return players ?? new List<CompetitiveDrillPlayer>();
        }

        private void SetPlayersInRoomCache(string roomId, List<CompetitiveDrillPlayer> players)
        {
            var cacheKey = string.Format(CachePatternConstants.RoomPlayers, roomId);
            _cache.Set(cacheKey, players, TimeSpan.FromHours(2));
        }

        private void RecordActivity(string roomId, string userId)
        {
            var key = $"activity:{roomId}:{userId}";
            _cache.Set(key, DateTime.UtcNow, TimeSpan.FromHours(2));
        }


    }
} 