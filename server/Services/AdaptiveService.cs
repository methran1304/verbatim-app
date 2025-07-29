using server.Entities.Enums;
using server.Services.Interfaces;
using server.Utils;

namespace server.Services
{
	public class AdaptiveService : IAdaptiveService
	{
		private readonly WordPoolManager _wordPoolManager;
		private readonly IDrillService _drillService;

		public AdaptiveService(IDrillService drillService, WordPoolManager wordPoolManager)
		{
			_wordPoolManager = wordPoolManager;
			_drillService = drillService;
		}

		public async Task<List<string>> GetErrorProneWordsAsync(string userId, DrillDifficulty difficulty)
		{
			var wordPool = _wordPoolManager.GetWordsByDifficulty(difficulty.ToString());

			var userSpecificDrills = await _drillService.GetAllDrillsAsync(userId);

			// filter by difficulty and last 30 days
			var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);
			var recentDrillsByDifficulty = userSpecificDrills
			.Where(d => d.DrillDifficulty == difficulty && d.CreatedAt >= thirtyDaysAgo)
			.OrderByDescending(d => d.CreatedAt)
			.ToList();

			// if no recent drills, return empty list (will be handled by fallback)
			if (recentDrillsByDifficulty.Count == 0)
			{
				Console.WriteLine($"No recent drills found for user {userId} in difficulty {difficulty}");
				return [];
			}

			// calculate weighted error maps with exponential decay
			var weightedWordErrorMap = new Dictionary<string, double>();
			var mostRecentDrillTime = recentDrillsByDifficulty.First().CreatedAt;

			foreach (var drill in recentDrillsByDifficulty)
			{
				// calculate days since most recent drill (0 = most recent, higher = older)
				var daysSinceMostRecent = (mostRecentDrillTime - drill.CreatedAt).TotalDays;
				
				// exponential decay weight: newer drills have higher weight
				// weight = e^(-0.1 * days) - this gives ~90% weight to drills from last 1 day, ~37% to drills from 10 days ago
				var weight = Math.Exp(-0.1 * daysSinceMostRecent);

				// apply weight to each word's error count
				foreach (var wordError in drill.Statistics.ErrorMap.WordErrorMap)
				{
					var weightedErrorCount = wordError.Value * weight;
					
					if (weightedWordErrorMap.ContainsKey(wordError.Key))
					{
						weightedWordErrorMap[wordError.Key] += weightedErrorCount;
					}
					else
					{
						weightedWordErrorMap[wordError.Key] = weightedErrorCount;
					}
				}
			}

			// get the top error-prone words (up to 10, but can be fewer if not enough data)
			var topErrorProneWords = weightedWordErrorMap
			.OrderByDescending(kvp => kvp.Value)
			.Take(Math.Min(10, weightedWordErrorMap.Count))
			.Select(kvp => kvp.Key)
			.ToList();

			Console.WriteLine($"Found {topErrorProneWords.Count} error-prone words for user {userId} in difficulty {difficulty}");

			// if no error-prone words found (user made no errors), return empty list
			if (topErrorProneWords.Count == 0)
			{
				Console.WriteLine($"No error-prone words found for user {userId} in difficulty {difficulty} - user may have made no errors");
				return [];
			}

			return topErrorProneWords;
		}

		public async Task<bool> CanGenerateAdaptiveDrillWordsAsync(string userId, DrillDifficulty difficulty)
		{
			var userSpecificDrills = await _drillService.GetAllDrillsAsync(userId);

			// filter by difficulty and last 30 days
			var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);
			var recentDrillsByDifficulty = userSpecificDrills
			.Where(d => d.DrillDifficulty == difficulty && d.CreatedAt >= thirtyDaysAgo);

			// require at least 5 drills in the last 30 days to enable adaptive mode
			return recentDrillsByDifficulty.Count() >= 5;
		}

		public async Task<(bool CanGenerate, string? ErrorMessage)> ValidateAdaptiveDrillGenerationAsync(string userId, DrillDifficulty difficulty, int requestedCount)
		{
			// Check if user has enough drill history
			if (!await CanGenerateAdaptiveDrillWordsAsync(userId, difficulty))
			{
				return (false, "Insufficient data to generate adaptive drill words. Please complete at least 5 drills in this difficulty.");
			}

			// Get error-prone words
			var errorProneWords = await GetErrorProneWordsAsync(userId, difficulty);

			// Check if we have any error-prone words
			if (errorProneWords.Count == 0)
			{
				return (false, "No error-prone words found. You may have made no errors in recent drills, or there's insufficient data. Try completing more drills in this difficulty.");
			}

			// Calculate if we can reasonably meet the requested count
			var targetWordsPerError = (int) Math.Ceiling(requestedCount / (double)errorProneWords.Count);
			var estimatedTotalWords = errorProneWords.Count * targetWordsPerError;

			// Check if the word pool has enough words for this difficulty
			var wordPool = _wordPoolManager.GetWordsByDifficulty(difficulty.ToString());
			if (wordPool.Count < estimatedTotalWords)
			{
				return (false, $"Insufficient words in the word pool for difficulty {difficulty}. Please try a different difficulty or contact support.");
			}

			return (true, null);
		}
	}
}