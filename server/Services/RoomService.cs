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

            var room = new Room
            {
                RoomId = roomId,
                CreatedBy = userId,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                RoomCode = Guid.NewGuid().ToString().Substring(0, 6).ToUpper(),
                State = RoomState.Waiting,
                Availability = RoomAvailability.Available,
                AssociatedCompetitiveDrillIds = new List<string>(),
                ActiveCompetitiveDrillId = null, // Set to null for new rooms
                DrillSettings = settings,
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
	}
}