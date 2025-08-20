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
        void StartAFKMonitoring(string roomCode, DrillSettings drillSettings);
        void StopAFKMonitoring(string roomCode);
        Task CheckAFKPlayersAsync(string roomCode, DrillSettings drillSettings);
        Task HandleAFKPlayerAsync(string roomCode, string userId);
        TimeSpan GetAFKTimeout(DrillSettings drillSettings);
    }

    public class AFKDetectionService : IAFKDetectionService
    {
        private readonly IMemoryCache _cache;
        private readonly ICompetitiveDrillService _competitiveDrillService;
        private readonly IRoomService _roomService;
        private readonly Dictionary<string, Timer> _afkTimers = new();
        private readonly object _timerLock = new();

        public AFKDetectionService(
            IMemoryCache cache,
            ICompetitiveDrillService competitiveDrillService,
            IRoomService roomService)
        {
            _cache = cache;
            _competitiveDrillService = competitiveDrillService;
            _roomService = roomService;
        }



        public void StartAFKMonitoring(string roomCode, DrillSettings drillSettings)
        {
            lock (_timerLock)
            {
                // stop existing timer if any
                StopAFKMonitoring(roomCode);

                // record drill start time
                RecordDrillStartTime(roomCode);

                // create new timer that checks every 10 seconds
                var timer = new Timer(async _ => await CheckAFKPlayersAsync(roomCode, drillSettings), 
                    null, TimeSpan.Zero, TimeSpan.FromSeconds(10));
                
                _afkTimers[roomCode] = timer;
            }
        }

        public void StopAFKMonitoring(string roomCode)
        {
            lock (_timerLock)
            {
                if (_afkTimers.TryGetValue(roomCode, out var timer))
                {
                    timer?.Dispose();
                    _afkTimers.Remove(roomCode);
                }
            }
        }

        public async Task CheckAFKPlayersAsync(string roomCode, DrillSettings drillSettings)
        {
            try
            {
                // Get active players from the competitive drill instead of PlayerService cache
                var activePlayers = await _competitiveDrillService.GetActiveDrillPlayersAsync(roomCode);
                var now = DateTime.UtcNow;
                var timeout = GetAFKTimeout(drillSettings);
                var drillStartTime = GetDrillStartTime(roomCode);

                foreach (var player in activePlayers.Where(p => p.State == PlayerState.Typing))
                {
                    var lastActivity = GetLastActivity(roomCode, player.UserId);
                    if (lastActivity.HasValue)
                    {
                        var inactiveTime = now - lastActivity.Value;
                        if (inactiveTime > timeout)
                        {
                            await HandleAFKPlayerAsync(roomCode, player.UserId);
                        }
                    }
                    else
                    {
                        // no activity recorded - player hasn't typed since drill started
                        var timeSinceDrillStart = now - drillStartTime;
                        if (timeSinceDrillStart > timeout)
                        {
                            await HandleAFKPlayerAsync(roomCode, player.UserId);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // log error but don't crash the timer
                Console.WriteLine($"Error checking AFK players for room {roomCode}: {ex.Message}");
            }
        }

        public async Task HandleAFKPlayerAsync(string roomCode, string userId)
        {
            // mark player as disconnected in the competitive drill
            var disconnectSuccess = await _competitiveDrillService.MarkPlayerDisconnectedAsync(roomCode, userId);
            if (!disconnectSuccess)
            {
                Console.WriteLine($"Warning: Failed to mark player {userId} as disconnected due to AFK");
            }

            // check if this was a marathon drill and if all remaining players are finished
            var finishedCount = await _competitiveDrillService.GetFinishedPlayerCountAsync(roomCode);
            var activeCount = await _competitiveDrillService.GetActivePlayerCountAsync(roomCode);

            if (finishedCount == activeCount)
            {
                // all remaining players are finished, end the drill
                var room = await GetRoomByCodeAsync(roomCode);
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
            return TimeSpan.FromSeconds(60); // 60 seconds for all drill types
        }

        private DateTime? GetLastActivity(string roomCode, string userId)
        {
            var key = GetActivityKey(roomCode, userId);
            _cache.TryGetValue(key, out DateTime lastActivity);
            return lastActivity;
        }

        private string GetActivityKey(string roomCode, string userId)
        {
            return $"activity:{roomCode}:{userId}";
        }

        private DateTime GetDrillStartTime(string roomCode)
        {
            var key = $"drill_start:{roomCode}";
            _cache.TryGetValue(key, out DateTime startTime);
            return startTime;
        }

        private void RecordDrillStartTime(string roomCode)
        {
            var key = $"drill_start:{roomCode}";
            _cache.Set(key, DateTime.UtcNow, TimeSpan.FromHours(2));
        }

        private async Task<Room?> GetRoomByCodeAsync(string roomCode)
        {
            return await _roomService.GetRoomByCodeAsync(roomCode);
        }
    }
} 