using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface IRoomService
    {
        Task<Room> CreateRoomAsync(string userId, DrillSettings settings);
        Task<Room?> GetRoomByIdAsync(string roomId);
        Task<bool> UpdateRoomStateAsync(string roomId, RoomState state);
        Task<bool> UpdateRoomAvailabilityAsync(string roomId, RoomAvailability availability);
        Task<bool> SetActiveCompetitiveDrillAsync(string roomId, string competitiveDrillId);
        Task<bool> DeleteRoomAsync(string roomId, string userId);
        Task<List<Room>> GetAllRoomsAsync();
        Task<bool> IsRoomActiveAsync(string roomId);
        Task<bool> IsRoomFullAsync(string roomId);
    }
}
