using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services.Interfaces;

namespace server.Services
{
    public class CompetitiveDrillOrchestrator : ICompetitiveDrillOrchestrator
    {
        private readonly IRoomService _roomService;
        private readonly IPlayerService _playerService;
        private readonly ICompetitiveDrillService _competitiveDrillService;
        private readonly IAFKDetectionService _afkDetectionService;
        private readonly IDrillTextService _drillTextService;

        public CompetitiveDrillOrchestrator(
            IRoomService roomService,
            IPlayerService playerService,
            ICompetitiveDrillService competitiveDrillService,
            IAFKDetectionService afkDetectionService,
            IDrillTextService drillTextService)
        {
            _roomService = roomService;
            _playerService = playerService;
            _competitiveDrillService = competitiveDrillService;
            _afkDetectionService = afkDetectionService;
            _drillTextService = drillTextService;
        }

        public async Task<bool> StartDrillAsync(string roomId)
        {
            // get room and validate
            var room = await _roomService.GetRoomByIdAsync(roomId);
            if (room == null || room.State != RoomState.Ready)
                return false;

            // check if all players are ready
            if (!_playerService.AreAllPlayersReady(roomId))
                return false;

            // create competitive drill
            var competitiveDrill = await _competitiveDrillService.CreateCompetitiveDrillAsync(roomId, room.CreatedBy);
            
            // update room state
            await _roomService.UpdateRoomStateAsync(roomId, RoomState.InProgress);
            await _roomService.SetActiveCompetitiveDrillAsync(roomId, competitiveDrill.CompetitiveDrillId);

            // start all players typing
            var players = _playerService.GetPlayersInRoom(roomId);
            foreach (var player in players)
            {
                _playerService.StartPlayerTyping(roomId, player.UserId);
            }

            // start AFK monitoring
            _afkDetectionService.StartAFKMonitoring(roomId, room.DrillSettings);

            return true;
        }

        public async Task<bool> EndDrillAsync(string roomId)
        {
            // stop AFK monitoring
            _afkDetectionService.StopAFKMonitoring(roomId);

            // update room state
            await _roomService.UpdateRoomStateAsync(roomId, RoomState.Finished);

            return true;
        }

        public async Task<bool> HandlePlayerCompletionAsync(string roomId, string userId, DrillResult result)
        {
            var room = await _roomService.GetRoomByIdAsync(roomId);
            if (room?.DrillSettings == null)
                return false;

            if (room.DrillSettings.Type == CompetitiveDrillType.Marathon)
            {
                // for marathon drills, use the marathon completion logic
                return await _competitiveDrillService.HandleMarathonCompletionAsync(roomId, userId, result);
            }
            else
            {
                // for timed drills, just mark player as finished
                _playerService.SetPlayerFinished(roomId, userId, result);
                
                // check if all players are finished (for timed drills that end early)
                var finishedCount = await _competitiveDrillService.GetFinishedPlayerCountAsync(roomId);
                var activeCount = await _competitiveDrillService.GetActivePlayerCountAsync(roomId);
                
                if (finishedCount == activeCount)
                {
                    // all players finished early, determine winner and end drill
                    await EndDrillWithWinner(roomId);
                    return true;
                }
                
                return false; // don't end drill yet, wait for timer
            }
        }

        public async Task<bool> HandlePlayerDisconnectAsync(string roomId, string userId)
        {
            // mark player as disconnected
            var disconnectResult = new DrillResult
            {
                UserId = userId,
                WPM = 0,
                Accuracy = 0,
                WordsCompleted = 0,
                TotalWords = 0,
                CompletionPercentage = 0,
                Position = 0,
                PointsChange = 0,
                FinishedAt = DateTime.UtcNow
            };

            _playerService.SetPlayerFinished(roomId, userId, disconnectResult);

            // check if drill should end
            var finishedCount = await _competitiveDrillService.GetFinishedPlayerCountAsync(roomId);
            var activeCount = await _competitiveDrillService.GetActivePlayerCountAsync(roomId);

            if (finishedCount == activeCount)
            {
                // all players are finished, end the drill
                var room = await _roomService.GetRoomByIdAsync(roomId);
                if (room?.ActiveCompetitiveDrillId != null)
                {
                    var winnerId = await _competitiveDrillService.DetermineWinnerAsync(room.ActiveCompetitiveDrillId);
                    if (!string.IsNullOrEmpty(winnerId))
                    {
                        await _competitiveDrillService.SetWinnerAsync(room.ActiveCompetitiveDrillId, winnerId);
                    }
                    await _competitiveDrillService.UpdateDrillStateAsync(room.ActiveCompetitiveDrillId, DrillState.Completed);
                    await EndDrillAsync(roomId);
                }
                return true;
            }

            return false;
        }

        public async Task<bool> EndTimedDrillAsync(string roomId)
        {
            // this is called when the timer expires for timed drills
            var room = await _roomService.GetRoomByIdAsync(roomId);
            if (room?.ActiveCompetitiveDrillId == null)
                return false;

            // determine winner and end drill
            await EndDrillWithWinner(roomId);
            return true;
        }

        private async Task EndDrillWithWinner(string roomId)
        {
            var room = await _roomService.GetRoomByIdAsync(roomId);
            if (room?.ActiveCompetitiveDrillId == null)
                return;

            // determine winner
            var winnerId = await _competitiveDrillService.DetermineWinnerAsync(room.ActiveCompetitiveDrillId);
            if (!string.IsNullOrEmpty(winnerId))
            {
                await _competitiveDrillService.SetWinnerAsync(room.ActiveCompetitiveDrillId, winnerId);
            }

            // update drill state and end
            await _competitiveDrillService.UpdateDrillStateAsync(room.ActiveCompetitiveDrillId, DrillState.Completed);
            await EndDrillAsync(roomId);
        }
    }
} 