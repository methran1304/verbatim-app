using server.Entities;
using server.Entities.Enums;

namespace server.Services.Interfaces
{
    public interface IUserRoomSessionService
    {
        Task<UserRoomSession> CreateSessionAsync(string userId, string roomCode, UserRole role);
        Task<UserRoomSession?> GetActiveSessionAsync(string userId);
        Task UpdateActivityAsync(string userId);
        Task ClearSessionAsync(string userId);
        Task<bool> ValidateSessionAsync(string userId, string roomCode);
        Task<List<UserRoomSession>> GetSessionsByRoomCodeAsync(string roomCode);
        Task ClearAllSessionsForRoomAsync(string roomCode);
    }
}
