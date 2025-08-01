using Microsoft.Extensions.Caching.Memory;
using server.Constants;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services.Interfaces;

namespace server.Services
{
    public interface IDrillTextService
    {
        List<string> GenerateDrillText(DrillSettings settings);
        Task<bool> SetDrillTextForRoomAsync(string roomId, List<string> drillText);
        Task<List<string>> GetDrillTextForRoomAsync(string roomId);
    }

    public class DrillTextService : IDrillTextService
    {
        private readonly IMemoryCache _cache;
        private readonly IDrillService _drillService;

        public DrillTextService(IMemoryCache cache, IDrillService drillService)
        {
            _cache = cache;
            _drillService = drillService;
        }

        public List<string> GenerateDrillText(DrillSettings settings)
        {
            return _drillService.GetDrillText(settings.Difficulty, settings.Length);
        }

        public Task<bool> SetDrillTextForRoomAsync(string roomId, List<string> drillText)
        {
            var cacheKey = string.Format(CachePatternConstants.RoomDrillText, roomId);
            _cache.Set(cacheKey, drillText, TimeSpan.FromHours(2));
            return Task.FromResult(true);
        }

        public Task<List<string>> GetDrillTextForRoomAsync(string roomId)
        {
            var cacheKey = string.Format(CachePatternConstants.RoomDrillText, roomId);
            _cache.TryGetValue(cacheKey, out List<string>? drillText);
            return Task.FromResult(drillText ?? new List<string>());
        }
    }
} 