using server.Entities;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface IPlayerService
    {
        bool AddPlayerToRoom(string roomCode, string userId);
        bool RemovePlayerFromRoom(string roomCode, string userId);
        bool KickPlayerFromLobby(string roomCode, string userId, string kickedByUserId);
        List<CompetitiveDrillPlayer> GetPlayersInRoom(string roomCode);
        bool UpdatePlayerStatistics(string roomCode, string userId, PlayerStatistics stats);
        bool SetPlayerReady(string roomCode, string userId);
        bool StartPlayerTyping(string roomCode, string userId);
        bool SetPlayerFinished(string roomCode, string userId, DrillResult result);
        bool IsPlayerInRoom(string roomCode, string userId);
        CompetitiveDrillPlayer? GetPlayer(string roomCode, string userId);
        List<CompetitiveDrillPlayer> GetReadyPlayers(string roomCode);
        bool AreAllPlayersReady(string roomCode);
        int GetPlayerCount(string roomCode);
    }
} 