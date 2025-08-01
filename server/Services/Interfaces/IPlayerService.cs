using server.Entities;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface IPlayerService
    {
        bool AddPlayerToRoom(string roomId, string userId);
        bool RemovePlayerFromRoom(string roomId, string userId);
        bool KickPlayerFromLobby(string roomId, string userId, string kickedByUserId);
        List<CompetitiveDrillPlayer> GetPlayersInRoom(string roomId);
        bool UpdatePlayerStatistics(string roomId, string userId, PlayerStatistics stats);
        bool SetPlayerReady(string roomId, string userId);
        bool StartPlayerTyping(string roomId, string userId);
        bool SetPlayerFinished(string roomId, string userId, DrillResult result);
        bool IsPlayerInRoom(string roomId, string userId);
        CompetitiveDrillPlayer? GetPlayer(string roomId, string userId);
        List<CompetitiveDrillPlayer> GetReadyPlayers(string roomId);
        bool AreAllPlayersReady(string roomId);
        int GetPlayerCount(string roomId);
    }
} 