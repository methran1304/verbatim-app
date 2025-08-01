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
            var roomId = Guid.NewGuid().ToString();

            // Generate drill text for the room
            var drillText = _drillTextService.GenerateDrillText(settings);
            await _drillTextService.SetDrillTextForRoomAsync(roomId, drillText);

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
                ActiveCompetitiveDrillId = string.Empty,
                DrillSettings = settings,
            };

            await _rooms.InsertOneAsync(room);

            return room;
        }

		public async Task<bool> DeleteRoomAsync(string roomId, string userId)
		{
			var room = await GetRoomByIdAsync(roomId);
			if (room == null || room.CreatedBy != userId)
				return false;

			var result = await _rooms.DeleteOneAsync(r => r.RoomId == roomId);
			return result.DeletedCount > 0;
		}

		public async Task<List<Room>> GetAllRoomsAsync()
		{
			return await _rooms.Find(r => r.IsActive).ToListAsync();
		}

		public async Task<Room?> GetRoomByIdAsync(string roomId)
		{
			return await _rooms.Find(r => r.RoomId == roomId).FirstOrDefaultAsync();
		}

		public async Task<bool> UpdateRoomAvailabilityAsync(string roomId, RoomAvailability availability)
		{
			var result = await _rooms.UpdateOneAsync(
				r => r.RoomId == roomId,
				Builders<Room>.Update.Set(r => r.Availability, availability)
			);
			return result.ModifiedCount > 0;
		}

		public async Task<bool> UpdateRoomStateAsync(string roomId, RoomState state)
		{
			var result = await _rooms.UpdateOneAsync(
				r => r.RoomId == roomId,
				Builders<Room>.Update.Set(r => r.State, state)
			);
			return result.ModifiedCount > 0;
		}

		public async Task<bool> IsRoomActiveAsync(string roomId)
		{
			var room = await GetRoomByIdAsync(roomId);
			return room?.IsActive == true;
		}

		public async Task<bool> SetActiveCompetitiveDrillAsync(string roomId, string competitiveDrillId)
		{
			var result = await _rooms.UpdateOneAsync(
				r => r.RoomId == roomId,
				Builders<Room>.Update.Set(r => r.ActiveCompetitiveDrillId, competitiveDrillId)
			);
			return result.ModifiedCount > 0;
		}

		public async Task<bool> IsRoomFullAsync(string roomId)
        {
            var room = await GetRoomByIdAsync(roomId);
            return room?.Availability == RoomAvailability.Full;
        }
	}
}