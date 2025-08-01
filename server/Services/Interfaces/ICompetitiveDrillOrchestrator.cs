using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface ICompetitiveDrillOrchestrator
    {
        Task<bool> StartDrillAsync(string roomId);
        Task<bool> EndDrillAsync(string roomId);
        Task<bool> EndTimedDrillAsync(string roomId);
        Task<bool> HandlePlayerCompletionAsync(string roomId, string userId, DrillResult result);
        Task<bool> HandlePlayerDisconnectAsync(string roomId, string userId);
    }
} 