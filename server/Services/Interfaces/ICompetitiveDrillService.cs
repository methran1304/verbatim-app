using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface ICompetitiveDrillService
    {
        Task<CompetitiveDrill> CreateCompetitiveDrillAsync(string roomId, string createdBy);
        Task<CompetitiveDrill?> GetCompetitiveDrillAsync(string competitiveDrillId);
        Task<bool> UpdateCompetitiveDrillAsync(CompetitiveDrill drill);
        Task<bool> UpdateDrillStateAsync(string competitiveDrillId, DrillState state);
        Task<bool> SetWinnerAsync(string competitiveDrillId, string winnerId);
        Task<List<CompetitiveDrill>> GetDrillsByRoomAsync(string roomId);
        Task<string?> DetermineWinnerAsync(string competitiveDrillId);
        Task<bool> IsDrillCompletedAsync(string competitiveDrillId);
        Task<bool> HandleMarathonCompletionAsync(string roomId, string userId, DrillResult result);
        Task<int> GetFinishedPlayerCountAsync(string roomId);
        Task<int> GetActivePlayerCountAsync(string roomId);
    }
}