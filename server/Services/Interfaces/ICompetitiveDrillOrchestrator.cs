using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface ICompetitiveDrillOrchestrator
    {
        Task<bool> StartDrillAsync(string roomCode);
        Task<bool> EndDrillAsync(string roomCode);
        Task<bool> EndTimedDrillAsync(string roomCode);
        Task<bool> HandlePlayerCompletionAsync(string roomCode, string userId, DrillResult result);
        Task<bool> HandlePlayerDisconnectAsync(string roomCode, string userId);
    }
} 