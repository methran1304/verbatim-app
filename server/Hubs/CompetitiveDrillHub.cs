using Microsoft.AspNetCore.SignalR;
using server.Entities.Models;


namespace server.Hubs
{
    public interface ICompetitiveDrillClient
    {
        // room management
        Task CreateRoom(DrillSettings drillSettings);
        Task LeaveRoom(string roomId, string userId);
        Task DeleteRoom(string roomId, string userId);

        // player state management
        Task PlayerReady(string roomId, string userId);
        Task PlayerJoin(string roomId, string userId);
        Task PlayerLeave(string roomId, string userId); // player leave before drill start
        Task PlayerDisconnect(string roomId, string userId); // player disconnects after drill start
        Task PlayerStatisticsUpdate(string roomId, string userId, PlayerStatistics playerStatistics);

        // drill lifecycle
        // start drill (with countdown) if all players are in ready state
        Task StartDrill(string roomId);

        // end drill if certain conditions are met:
        // - timed: centralized timer (in the server) runs out
        // - marathon: all players complete the drill
        Task EndDrill(string roomId);
        Task PlayerCompleteDrill(string roomId, string playerId);
        
        // marathon drill specific
        Task WaitingForOtherPlayers(string roomId, int finishedCount, int totalCount);
        Task AllPlayersCompleted(string roomId);
        
        // AFK handling
        Task PlayerAFK(string roomId, string userId);
        Task AFKWarning(string roomId, string userId, int secondsRemaining);

        // error
        Task Error(string message);
    }

    public class CompetitiveDrillHub : Hub<ICompetitiveDrillClient>
    {
        
    }
}