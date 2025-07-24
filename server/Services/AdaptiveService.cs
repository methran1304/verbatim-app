using server.Entities.Enums;
using server.Services.Interfaces;
using server.Utils;

namespace server.Services
{
	public class AdaptiveService : IAdaptiveService
	{
		private readonly WordPoolManager _wordPoolManager;
		private readonly DrillService _drillService;

		public AdaptiveService(WordPoolManager wordPoolManager, DrillService drillService)
		{
			_wordPoolManager = wordPoolManager;
			_drillService = drillService;
		}

		public async Task<List<string>> GetAdaptiveDrillWordsAsync(string userId, DrillDifficulty difficulty, int count)
		{
			var userSpecificDrills = await _drillService.GetAllDrillsAsync(userId);

			// filter by difficulty and get the most recent 10 drills
			var recentDrillsByDifficulty = userSpecificDrills
			.Where(d => d.DrillDifficulty == difficulty)
			.OrderByDescending(d => d.CreatedAt)
			.Take(10)
			.ToList();

			// get the word error map of the recent drills
			var wordErrorMaps = recentDrillsByDifficulty
			.Select(d => d.Statistics.ErrorMap.WordErrorMap)
			.ToList();

			// combine the word error maps
			var combinedWordErrorMap = wordErrorMaps
			.Aggregate(
				(a, b) => a
				.Concat(b)
				.ToDictionary(k => k.Key, v => v.Value)
			);

			// get the top 10 most frequent words
			var top10MostFrequentWords = combinedWordErrorMap
			.OrderByDescending(kvp => kvp.Value)
			.ToList();


			return new List<string>();
		}

		public async Task<bool> CanGenerateAdaptiveDrillWordsAsync(string userId, DrillDifficulty difficulty)
		{
			var userSpecificDrills = await _drillService.GetAllDrillsAsync(userId);

			// filter by difficulty
			var difficultyFilteredDrills = userSpecificDrills.Where(d => d.DrillDifficulty == difficulty);

			// if the count of difficultyFilteredDrills is greater than 10, return true
			return difficultyFilteredDrills.Count() > 10;
		}
	}
}