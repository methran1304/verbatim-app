using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services.Interfaces;

namespace server.Services
{
    public class CompetitiveDrillOrchestrator : ICompetitiveDrillOrchestrator
    {
        private readonly IRoomService _roomService;
        private readonly ICompetitiveDrillService _competitiveDrillService;
        private readonly IAFKDetectionService _afkDetectionService;
        private readonly IDrillTextService _drillTextService;

        public CompetitiveDrillOrchestrator(
            IRoomService roomService,
            ICompetitiveDrillService competitiveDrillService,
            IAFKDetectionService afkDetectionService,
            IDrillTextService drillTextService)
        {
            _roomService = roomService;
            _competitiveDrillService = competitiveDrillService;
            _afkDetectionService = afkDetectionService;
            _drillTextService = drillTextService;
        }

        public async Task<bool> StartDrillAsync(string roomCode)
        {
            // get room and validate
            var room = await _roomService.GetRoomByCodeAsync(roomCode);
            if (room == null || room.State != RoomState.Waiting)
                return false;

            var players = await _roomService.GetPlayersInRoomAsync(roomCode);

            // check if all players are ready using room service
            var readyPlayerCount = await _roomService.GetReadyPlayerCountAsync(roomCode);
            var totalPlayerCount = players.Count;
            
            if (readyPlayerCount != totalPlayerCount)
                return false;

            // create competitive drill
            var competitiveDrill = await _competitiveDrillService.CreateCompetitiveDrillAsync(roomCode, room.CreatedBy);
            
            // update room state
            await _roomService.UpdateRoomStateAsync(roomCode, RoomState.InProgress);
            await _roomService.SetActiveCompetitiveDrillAsync(roomCode, competitiveDrill.CompetitiveDrillId);

            // start AFK monitoring only for marathon drills
            if (room.DrillSettings.Type == CompetitiveDrillType.Marathon)
            {
                _afkDetectionService.StartAFKMonitoring(roomCode, room.DrillSettings);
            }

            return true;
        }

        public async Task<bool> EndDrillAsync(string roomCode)
        {
            Console.WriteLine($"EndDrillAsync called for room {roomCode}");
            
            // stop AFK monitoring
            _afkDetectionService.StopAFKMonitoring(roomCode);
            Console.WriteLine($"AFK monitoring stopped for room {roomCode}");

            // update room state
            await _roomService.UpdateRoomStateAsync(roomCode, RoomState.Finished);
            Console.WriteLine($"Room state updated to Finished for room {roomCode}");

            return true;
        }

        public async Task<bool> HandlePlayerCompletionAsync(string roomCode, string userId, DrillResult result)
        {
            Console.WriteLine($"HandlePlayerCompletionAsync called for room {roomCode}, user {userId}");
            
            var room = await _roomService.GetRoomByCodeAsync(roomCode);
            if (room?.DrillSettings == null)
            {
                Console.WriteLine($"Room or DrillSettings not found for room {roomCode}");
                return false;
            }

            Console.WriteLine($"Drill type: {room.DrillSettings.Type}");

            if (room.DrillSettings.Type == CompetitiveDrillType.Marathon)
            {
                Console.WriteLine($"Processing marathon drill completion for user {userId}");
                // for marathon drills, use the marathon completion logic
                var marathonCompleted = await _competitiveDrillService.HandleMarathonCompletionAsync(roomCode, userId, result);
                
                Console.WriteLine($"Marathon completion result: {marathonCompleted}");
                
                if (marathonCompleted)
                {
                    // Marathon drill completed - end the drill properly
                    Console.WriteLine($"Marathon drill completed, calling EndDrillWithWinner");
                    await EndDrillWithWinner(roomCode);
                    return true;
                }
                
                // Marathon drill not completed yet - player is already marked as finished in database
                Console.WriteLine($"Marathon drill not completed yet, waiting for other players");
                return false;
            }
            else
            {
                Console.WriteLine($"Processing timed drill completion for user {userId}");
                // for timed drills, player is already marked as finished in database
                
                // check if all players are finished (for timed drills that end early)
                var finishedCount = await _competitiveDrillService.GetFinishedPlayerCountAsync(roomCode);
                var activeCount = await _competitiveDrillService.GetActivePlayerCountAsync(roomCode);
                
                Console.WriteLine($"Timed drill - Finished: {finishedCount}, Active: {activeCount}");
                
                if (finishedCount == activeCount)
                {
                    // all players finished early, determine winner and end drill
                    Console.WriteLine($"All players finished early, calling EndDrillWithWinner");
                    await EndDrillWithWinner(roomCode);
                    return true;
                }
                
                return false; // don't end drill yet, wait for timer
            }
        }

        public async Task<bool> HandlePlayerDisconnectAsync(string roomCode, string userId)
        {
            // mark player as disconnected in the competitive drill
            var disconnectSuccess = await _competitiveDrillService.MarkPlayerDisconnectedAsync(roomCode, userId);
            if (!disconnectSuccess)
            {
                Console.WriteLine($"Warning: Failed to mark player {userId} as disconnected");
            }

            // check if drill should end
            var finishedCount = await _competitiveDrillService.GetFinishedPlayerCountAsync(roomCode);
            var activeCount = await _competitiveDrillService.GetActivePlayerCountAsync(roomCode);

            if (finishedCount == activeCount)
            {
                // all players are finished, end the drill
                var room = await _roomService.GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId != null)
                {
                    var winnerId = await _competitiveDrillService.DetermineWinnerAsync(room.ActiveCompetitiveDrillId);
                    if (!string.IsNullOrEmpty(winnerId))
                    {
                        await _competitiveDrillService.SetWinnerAsync(room.ActiveCompetitiveDrillId, winnerId);
                    }
                    await _competitiveDrillService.UpdateDrillStateAsync(room.ActiveCompetitiveDrillId, DrillState.Completed);
                    await EndDrillAsync(roomCode);
                }
                return true;
            }

            return false;
        }

        public async Task<bool> EndTimedDrillAsync(string roomCode)
        {
            // this is called when the timer expires for timed drills
            var room = await _roomService.GetRoomByCodeAsync(roomCode);
            if (room?.ActiveCompetitiveDrillId == null)
                return false;

            // determine winner and end drill
            await EndDrillWithWinner(roomCode);
            return true;
        }

        private async Task EndDrillWithWinner(string roomCode)
        {
            Console.WriteLine($"EndDrillWithWinner called for room {roomCode}");
            
            var room = await _roomService.GetRoomByCodeAsync(roomCode);
            if (room?.ActiveCompetitiveDrillId == null)
            {
                Console.WriteLine($"Room or ActiveCompetitiveDrillId not found for room {roomCode}");
                return;
            }

            Console.WriteLine($"Found room with ActiveCompetitiveDrillId: {room.ActiveCompetitiveDrillId}");

            // determine winner
            var winnerId = await _competitiveDrillService.DetermineWinnerAsync(room.ActiveCompetitiveDrillId);
            if (!string.IsNullOrEmpty(winnerId))
            {
                await _competitiveDrillService.SetWinnerAsync(room.ActiveCompetitiveDrillId, winnerId);
                Console.WriteLine($"Winner set: {winnerId}");
            }
            else
            {
                Console.WriteLine($"No winner determined");
            }

            // update drill state and end
            await _competitiveDrillService.UpdateDrillStateAsync(room.ActiveCompetitiveDrillId, DrillState.Completed);
            Console.WriteLine($"Drill state updated to Completed");
            
            Console.WriteLine($"Calling EndDrillAsync for room {roomCode}");
            await EndDrillAsync(roomCode);
            Console.WriteLine($"EndDrillAsync completed for room {roomCode}");
        }
    }
} 