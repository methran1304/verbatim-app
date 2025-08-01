using Microsoft.Extensions.Caching.Memory;
using server.Constants;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services.Interfaces;

namespace server.Services
{
    public interface IAFKDetectionService
    {
        void StartAFKMonitoring(string roomId, DrillSettings drillSettings);
        void StopAFKMonitoring(string roomId);
        Task CheckAFKPlayersAsync(string roomId, DrillSettings drillSettings);
        Task HandleAFKPlayerAsync(string roomId, string userId);
        TimeSpan GetAFKTimeout(DrillSettings drillSettings);
    }

    public class AFKDetectionService : IAFKDetectionService
    {
        private readonly IMemoryCache _cache;
        private readonly IPlayerService _playerService;
        private readonly ICompetitiveDrillService _competitiveDrillService;
        private readonly IRoomService _roomService;
        private readonly Dictionary<string, Timer> _afkTimers = new();
        private readonly object _timerLock = new();

        public AFKDetectionService(
            IMemoryCache cache,
            IPlayerService playerService,
            ICompetitiveDrillService competitiveDrillService,
            IRoomService roomService)
        {
            _cache = cache;
            _playerService = playerService;
            _competitiveDrillService = competitiveDrillService;
            _roomService = roomService;
        }



        public void StartAFKMonitoring(string roomId, DrillSettings drillSettings)
        {
            lock (_timerLock)
            {
                // stop existing timer if any
                StopAFKMonitoring(roomId);

                // record drill start time
                RecordDrillStartTime(roomId);

                // create new timer that checks every 10 seconds
                var timer = new Timer(async _ => await CheckAFKPlayersAsync(roomId, drillSettings), 
                    null, TimeSpan.Zero, TimeSpan.FromSeconds(10));
                
                _afkTimers[roomId] = timer;
            }
        }

        public void StopAFKMonitoring(string roomId)
        {
            lock (_timerLock)
            {
                if (_afkTimers.TryGetValue(roomId, out var timer))
                {
                    timer?.Dispose();
                    _afkTimers.Remove(roomId);
                }
            }
        }

        public async Task CheckAFKPlayersAsync(string roomId, DrillSettings drillSettings)
        {
            try
            {
                var players = _playerService.GetPlayersInRoom(roomId);
                var now = DateTime.UtcNow;
                var timeout = GetAFKTimeout(drillSettings);
                var drillStartTime = GetDrillStartTime(roomId);

                foreach (var player in players.Where(p => p.State == PlayerState.Typing))
                {
                    var lastActivity = GetLastActivity(roomId, player.UserId);
                    if (lastActivity.HasValue)
                    {
                        var inactiveTime = now - lastActivity.Value;
                        if (inactiveTime > timeout)
                        {
                            await HandleAFKPlayerAsync(roomId, player.UserId);
                        }
                    }
                    else
                    {
                        // no activity recorded - player hasn't typed since drill started
                        var timeSinceDrillStart = now - drillStartTime;
                        if (timeSinceDrillStart > timeout)
                        {
                            await HandleAFKPlayerAsync(roomId, player.UserId);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // log error but don't crash the timer
                Console.WriteLine($"Error checking AFK players for room {roomId}: {ex.Message}");
            }
        }

        public async Task HandleAFKPlayerAsync(string roomId, string userId)
        {
            // mark player as disconnected
            var afkResult = new DrillResult
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

            _playerService.SetPlayerFinished(roomId, userId, afkResult);

            // check if this was a marathon drill and if all remaining players are finished
            var finishedCount = await _competitiveDrillService.GetFinishedPlayerCountAsync(roomId);
            var activeCount = await _competitiveDrillService.GetActivePlayerCountAsync(roomId);

            if (finishedCount == activeCount)
            {
                // all remaining players are finished, end the drill
                var room = await GetRoomByIdAsync(roomId);
                if (room?.ActiveCompetitiveDrillId != null)
                {
                    var winnerId = await _competitiveDrillService.DetermineWinnerAsync(room.ActiveCompetitiveDrillId);
                    if (!string.IsNullOrEmpty(winnerId))
                    {
                        await _competitiveDrillService.SetWinnerAsync(room.ActiveCompetitiveDrillId, winnerId);
                    }
                    await _competitiveDrillService.UpdateDrillStateAsync(room.ActiveCompetitiveDrillId, DrillState.Completed);
                }
            }
        }

        public TimeSpan GetAFKTimeout(DrillSettings drillSettings)
        {
            return drillSettings.Type switch
            {
                CompetitiveDrillType.Timed => TimeSpan.FromSeconds(drillSettings.Duration * 0.5), // 50% of drill duration
                CompetitiveDrillType.Marathon => TimeSpan.FromSeconds(drillSettings.Length * 2), // 2 seconds per word for marathon
                _ => TimeSpan.FromSeconds(60) // default 60 seconds
            };
        }

        private DateTime? GetLastActivity(string roomId, string userId)
        {
            var key = GetActivityKey(roomId, userId);
            _cache.TryGetValue(key, out DateTime lastActivity);
            return lastActivity;
        }

        private string GetActivityKey(string roomId, string userId)
        {
            return $"activity:{roomId}:{userId}";
        }

        private DateTime GetDrillStartTime(string roomId)
        {
            var key = $"drill_start:{roomId}";
            _cache.TryGetValue(key, out DateTime startTime);
            return startTime;
        }

        private void RecordDrillStartTime(string roomId)
        {
            var key = $"drill_start:{roomId}";
            _cache.Set(key, DateTime.UtcNow, TimeSpan.FromHours(2));
        }

        private async Task<Room?> GetRoomByIdAsync(string roomId)
        {
            return await _roomService.GetRoomByIdAsync(roomId);
        }
    }
} 