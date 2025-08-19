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
        Task<bool> ClearActiveCompetitiveDrillAsync(string roomCode);
        Task<bool> AddAssociatedCompetitiveDrillIdAsync(string roomCode, string competitiveDrillId);
        Task<bool> DeleteRoomAsync(string roomCode, string userId);
        Task<List<Room>> GetAllRoomsAsync();
        Task<bool> IsRoomActiveAsync(string roomCode);
        Task<bool> IsRoomFullAsync(string roomCode);
        Task<bool> DeactivateRoomAsync(string roomCode);
        
        // Room-level player management methods
        Task<bool> AddPlayerToRoomAsync(string roomCode, string userId, bool isCreator = false);
        Task<bool> RemovePlayerFromRoomAsync(string roomCode, string userId);
        Task<bool> UpdatePlayerReadyStateAsync(string roomCode, string userId, bool isReady);
        Task<List<RoomPlayer>> GetPlayersInRoomAsync(string roomCode);
        Task<RoomPlayer?> GetPlayerInRoomAsync(string roomCode, string userId);
        Task<bool> IsPlayerInRoomAsync(string roomCode, string userId);
        Task<bool> IsPlayerReadyAsync(string roomCode, string userId);
        Task<bool> IsPlayerCreatorAsync(string roomCode, string userId);
        Task<int> GetReadyPlayerCountAsync(string roomCode);
        Task<int> GetPlayerCountAsync(string roomCode);
    }
}
