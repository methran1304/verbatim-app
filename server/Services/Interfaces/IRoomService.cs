using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface IRoomService
    {
        Task<Room> CreateRoomAsync(string userId, DrillSettings settings);
        Task<Room?> GetRoomByCodeAsync(string roomCode);
        Task<bool> UpdateRoomStateAsync(string roomCode, RoomState state);
        Task<bool> UpdateRoomAvailabilityAsync(string roomCode, RoomAvailability availability);
        Task<bool> SetActiveCompetitiveDrillAsync(string roomCode, string competitiveDrillId);
        Task<bool> DeleteRoomAsync(string roomCode, string userId);
        Task<List<Room>> GetAllRoomsAsync();
        Task<bool> IsRoomActiveAsync(string roomCode);
        Task<bool> IsRoomFullAsync(string roomCode);
        Task<bool> DeactivateRoomAsync(string roomCode);
    }
}
