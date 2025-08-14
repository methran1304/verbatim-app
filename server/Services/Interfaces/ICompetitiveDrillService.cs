using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface ICompetitiveDrillService
    {
        Task<CompetitiveDrill> CreateCompetitiveDrillAsync(string roomCode, string createdBy);
        Task<CompetitiveDrill?> GetCompetitiveDrillAsync(string competitiveDrillId);
        Task<bool> UpdateCompetitiveDrillAsync(CompetitiveDrill drill);
        Task<bool> UpdateDrillStateAsync(string competitiveDrillId, DrillState state);
        Task<bool> SetWinnerAsync(string competitiveDrillId, string winnerId);
        Task<List<CompetitiveDrill>> GetDrillsByRoomAsync(string roomCode);
        Task<string?> DetermineWinnerAsync(string competitiveDrillId);
        Task<bool> IsDrillCompletedAsync(string competitiveDrillId);
        Task<bool> HandleMarathonCompletionAsync(string roomCode, string userId, DrillResult result);
        Task<int> GetFinishedPlayerCountAsync(string roomCode);
        Task<int> GetActivePlayerCountAsync(string roomCode);
        Task<bool> AddPlayerToCompetitiveDrillAsync(string roomCode, string userId);
        
        // Drill-level player management methods
        Task<bool> UpdatePlayerStateAsync(string roomCode, string userId, PlayerState state);
        Task<bool> UpdatePlayerProgressAsync(string roomCode, string userId, PlayerStatistics statistics);
        Task<bool> MarkPlayerFinishedAsync(string roomCode, string userId, DrillResult result);
        Task<bool> MarkPlayerDisconnectedAsync(string roomCode, string userId);
        Task<bool> ReconnectPlayerAsync(string roomCode, string userId);
        Task<bool> ResetPlayerForNextDrillAsync(string roomCode, string userId);
        Task<PlayerState> GetPlayerStateAsync(string roomCode, string userId);
        Task<List<CompetitiveDrillPlayer>> GetActiveDrillPlayersAsync(string roomCode);
        Task<CompetitiveDrillPlayer?> GetDrillPlayerAsync(string roomCode, string userId);
        Task<bool> IsPlayerInDrillAsync(string roomCode, string userId);
        Task<bool> IsPlayerFinishedAsync(string roomCode, string userId);
        Task<int> GetTypingPlayerCountAsync(string roomCode);
        Task<int> GetDisconnectedPlayerCountAsync(string roomCode);
    }
}