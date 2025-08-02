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

        public async Task<bool> StartDrillAsync(string roomCode)
        {
            // get room and validate
            var room = await _roomService.GetRoomByCodeAsync(roomCode);
            if (room == null || room.State != RoomState.Ready)
                return false;

            // check if all players are ready
            if (!_playerService.AreAllPlayersReady(roomCode))
                return false;

            // create competitive drill
            var competitiveDrill = await _competitiveDrillService.CreateCompetitiveDrillAsync(roomCode, room.CreatedBy);
            
            // update room state
            await _roomService.UpdateRoomStateAsync(roomCode, RoomState.InProgress);
            await _roomService.SetActiveCompetitiveDrillAsync(roomCode, competitiveDrill.CompetitiveDrillId);

            // start all players typing
            var players = _playerService.GetPlayersInRoom(roomCode);
            foreach (var player in players)
            {
                _playerService.StartPlayerTyping(roomCode, player.UserId);
            }

            // start AFK monitoring
            _afkDetectionService.StartAFKMonitoring(roomCode, room.DrillSettings);

            return true;
        }

        public async Task<bool> EndDrillAsync(string roomCode)
        {
            // stop AFK monitoring
            _afkDetectionService.StopAFKMonitoring(roomCode);

            // update room state
            await _roomService.UpdateRoomStateAsync(roomCode, RoomState.Finished);

            return true;
        }

        public async Task<bool> HandlePlayerCompletionAsync(string roomCode, string userId, DrillResult result)
        {
            var room = await _roomService.GetRoomByCodeAsync(roomCode);
            if (room?.DrillSettings == null)
                return false;

            if (room.DrillSettings.Type == CompetitiveDrillType.Marathon)
            {
                // for marathon drills, use the marathon completion logic
                return await _competitiveDrillService.HandleMarathonCompletionAsync(roomCode, userId, result);
            }
            else
            {
                // for timed drills, just mark player as finished
                _playerService.SetPlayerFinished(roomCode, userId, result);
                
                // check if all players are finished (for timed drills that end early)
                var finishedCount = await _competitiveDrillService.GetFinishedPlayerCountAsync(roomCode);
                var activeCount = await _competitiveDrillService.GetActivePlayerCountAsync(roomCode);
                
                if (finishedCount == activeCount)
                {
                    // all players finished early, determine winner and end drill
                    await EndDrillWithWinner(roomCode);
                    return true;
                }
                
                return false; // don't end drill yet, wait for timer
            }
        }

        public async Task<bool> HandlePlayerDisconnectAsync(string roomCode, string userId)
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

            _playerService.SetPlayerFinished(roomCode, userId, disconnectResult);

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
            var room = await _roomService.GetRoomByCodeAsync(roomCode);
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
            await EndDrillAsync(roomCode);
        }
    }
} 