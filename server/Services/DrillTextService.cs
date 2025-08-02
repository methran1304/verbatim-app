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
        bool SetDrillTextForRoom(string roomCode, List<string> drillText);
        List<string> GetDrillTextForRoom(string roomCode);
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

        public bool SetDrillTextForRoom(string roomCode, List<string> drillText)
        {
            var cacheKey = string.Format(CachePatternConstants.RoomDrillText, roomCode);
            _cache.Set(cacheKey, drillText, TimeSpan.FromHours(2));
            return true;
        }

        public List<string> GetDrillTextForRoom(string roomCode)
        {
            var cacheKey = string.Format(CachePatternConstants.RoomDrillText, roomCode);
            _cache.TryGetValue(cacheKey, out List<string>? drillText);
            return drillText ?? new List<string>();
        }
    }
} 