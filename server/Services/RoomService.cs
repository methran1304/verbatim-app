using MongoDB.Driver;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services.Interfaces;

namespace server.Services
{
    public class RoomService : IRoomService
    {
        private readonly IMongoCollection<Room> _rooms;
        private readonly IDrillTextService _drillTextService;

        public RoomService(MongoDbContext context, IDrillTextService drillTextService)
        {
            _rooms = context.Rooms;
            _drillTextService = drillTextService;
        }

		public async Task<Room> CreateRoomAsync(string userId, DrillSettings settings)
        {
            var roomId = MongoDB.Bson.ObjectId.GenerateNewId().ToString();
            var roomCode = Guid.NewGuid().ToString().Substring(0, 6).ToUpper();

            var room = new Room
            {
                RoomId = roomId,
                CreatedBy = userId,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                RoomCode = roomCode,
                State = RoomState.Waiting,
                Availability = RoomAvailability.Available,
                AssociatedCompetitiveDrillIds = new List<string>(),
                ActiveCompetitiveDrillId = null, // Set to null for new rooms
                DrillSettings = settings,
                RoomPlayers = new List<RoomPlayer>
                {
                    new RoomPlayer
                    {
                        UserId = userId,
                        JoinedAt = DateTime.UtcNow,
                        IsReady = false, // Creator starts as not ready, just like other players
                        IsCreator = true
                    }
                }
            };

			// Generate drill text for the room
            var drillText = _drillTextService.GenerateDrillText(settings);
            _drillTextService.SetDrillTextForRoom(room.RoomCode, drillText);

            await _rooms.InsertOneAsync(room);

            return room;
        }

		public async Task<bool> DeleteRoomAsync(string roomCode, string userId)
		{
			var room = await GetRoomByCodeAsync(roomCode);
			if (room == null || room.CreatedBy != userId)
				return false;

			var result = await _rooms.DeleteOneAsync(r => r.RoomCode == roomCode);
			return result.DeletedCount > 0;
		}

		public async Task<List<Room>> GetAllRoomsAsync()
		{
			return await _rooms.Find(r => r.IsActive).ToListAsync();
		}

		public async Task<Room?> GetRoomByCodeAsync(string roomCode)
		{
			return await _rooms.Find(r => r.RoomCode == roomCode).FirstOrDefaultAsync();
		}

		public async Task<bool> UpdateRoomAvailabilityAsync(string roomCode, RoomAvailability availability)
		{
			var result = await _rooms.UpdateOneAsync(
				r => r.RoomCode == roomCode,
				Builders<Room>.Update.Set(r => r.Availability, availability)
			);
			return result.ModifiedCount > 0;
		}

		public async Task<bool> UpdateRoomStateAsync(string roomCode, RoomState state)
		{
			var result = await _rooms.UpdateOneAsync(
				r => r.RoomCode == roomCode,
				Builders<Room>.Update.Set(r => r.State, state)
			);
			return result.ModifiedCount > 0;
		}

		public async Task<bool> IsRoomActiveAsync(string roomCode)
		{
			var room = await GetRoomByCodeAsync(roomCode);
			return room?.IsActive == true;
		}

		public async Task<bool> SetActiveCompetitiveDrillAsync(string roomCode, string competitiveDrillId)
		{
			var result = await _rooms.UpdateOneAsync(
				r => r.RoomCode == roomCode,
				Builders<Room>.Update.Set(r => r.ActiveCompetitiveDrillId, competitiveDrillId)
			);
			return result.ModifiedCount > 0;
		}

		public async Task<bool> ClearActiveCompetitiveDrillAsync(string roomCode)
		{
			var result = await _rooms.UpdateOneAsync(
				r => r.RoomCode == roomCode,
				Builders<Room>.Update.Set(r => r.ActiveCompetitiveDrillId, null)
			);
			return result.ModifiedCount > 0;
		}

		public async Task<bool> AddAssociatedCompetitiveDrillIdAsync(string roomCode, string competitiveDrillId)
		{
			var result = await _rooms.UpdateOneAsync(
				r => r.RoomCode == roomCode,
				Builders<Room>.Update.Push(r => r.AssociatedCompetitiveDrillIds, competitiveDrillId)
			);
			return result.ModifiedCount > 0;
		}

		        public async Task<bool> IsRoomFullAsync(string roomCode)
        {
            var room = await GetRoomByCodeAsync(roomCode);
            return room?.Availability == RoomAvailability.Full;
        }

        public async Task<bool> DeactivateRoomAsync(string roomCode)
        {
            var result = await _rooms.UpdateOneAsync(
                r => r.RoomCode == roomCode,
                Builders<Room>.Update.Set(r => r.IsActive, false)
            );
            return result.ModifiedCount > 0;
        }

        // Room-level player management methods
        public async Task<bool> AddPlayerToRoomAsync(string roomCode, string userId, bool isCreator = false)
        {
            try
            {
                // Check if player is already in the room
                var existingPlayer = await GetPlayerInRoomAsync(roomCode, userId);
                if (existingPlayer != null)
                {
                    // Player already exists, no update needed
                    return true;
                }

                var newPlayer = new RoomPlayer
                {
                    UserId = userId,
                    JoinedAt = DateTime.UtcNow,
                    IsReady = false,
                    IsCreator = isCreator
                };

                var result = await _rooms.UpdateOneAsync(
                    r => r.RoomCode == roomCode,
                    Builders<Room>.Update.Push(r => r.RoomPlayers, newPlayer)
                );

                return result.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding player {userId} to room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> RemovePlayerFromRoomAsync(string roomCode, string userId)
        {
            try
            {
                var result = await _rooms.UpdateOneAsync(
                    r => r.RoomCode == roomCode,
                    Builders<Room>.Update.PullFilter(r => r.RoomPlayers, p => p.UserId == userId)
                );

                return result.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error removing player {userId} from room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> UpdatePlayerReadyStateAsync(string roomCode, string userId, bool isReady)
        {
            try
            {
                // Use the positional operator $ to update the first matching element
                // The filter must include the array element condition for the positional operator to work
                var filter = Builders<Room>.Filter.And(
                    Builders<Room>.Filter.Eq(r => r.RoomCode, roomCode),
                    Builders<Room>.Filter.ElemMatch(r => r.RoomPlayers, p => p.UserId == userId)
                );

                var update = Builders<Room>.Update
                    .Set("room_players.$.is_ready", isReady);

                var result = await _rooms.UpdateOneAsync(filter, update);

                return result.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating ready state for player {userId} in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<List<RoomPlayer>> GetPlayersInRoomAsync(string roomCode)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                return room?.RoomPlayers ?? new List<RoomPlayer>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting players for room {roomCode}: {ex.Message}");
                return new List<RoomPlayer>();
            }
        }

        public async Task<RoomPlayer?> GetPlayerInRoomAsync(string roomCode, string userId)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                return room?.RoomPlayers?.FirstOrDefault(p => p.UserId == userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting player {userId} from room {roomCode}: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> IsPlayerInRoomAsync(string roomCode, string userId)
        {
            try
            {
                var player = await GetPlayerInRoomAsync(roomCode, userId);
                return player != null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error checking if player {userId} is in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> IsPlayerReadyAsync(string roomCode, string userId)
        {
            try
            {
                var player = await GetPlayerInRoomAsync(roomCode, userId);
                return player?.IsReady == true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error checking if player {userId} is ready in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> IsPlayerCreatorAsync(string roomCode, string userId)
        {
            try
            {
                var player = await GetPlayerInRoomAsync(roomCode, userId);
                return player?.IsCreator == true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error checking if player {userId} is creator in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<int> GetReadyPlayerCountAsync(string roomCode)
        {
            try
            {
                var players = await GetPlayersInRoomAsync(roomCode);
                return players.Count(p => p.IsReady);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting ready player count for room {roomCode}: {ex.Message}");
                return 0;
            }
        }

        public async Task<int> GetPlayerCountAsync(string roomCode)
        {
            try
            {
                var players = await GetPlayersInRoomAsync(roomCode);
                return players.Count;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting player count for room {roomCode}: {ex.Message}");
                return 0;
            }
        }
	}
}