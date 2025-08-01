using MongoDB.Driver;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Enums;
using server.Utils;
using server.Services.Interfaces;

namespace server.Services
{
	public class DrillService : IDrillService
	{
		private readonly IMongoCollection<Drill> _drills;
		private readonly WordPoolManager _wordPoolManager;

		public DrillService(MongoDbContext context, WordPoolManager wordPoolManager)
		{
			_wordPoolManager = wordPoolManager;
			_drills = context.Drills;
		}

		public async Task CreateDrillAsync(Drill drill)
		{
			await _drills.InsertOneAsync(drill);
		}

		public async Task<List<Drill>> GetAllDrillsAsync(string userId)
		{
			return await _drills.Find(d => d.UserId == userId).ToListAsync();
		}

		public List<string> GetDrillText(DrillDifficulty difficulty, int length)
		{
			var wordCount = length;
			List<string> difficultyWords = new();

			switch (difficulty)
			{
				case DrillDifficulty.Beginner:
					difficultyWords = _wordPoolManager.GetWordsByDifficulty("beginner");
					break;
				case DrillDifficulty.Intermediate:
					difficultyWords = _wordPoolManager.GetWordsByDifficulty("intermediate");
					break;
				case DrillDifficulty.Advanced:
					difficultyWords = _wordPoolManager.GetWordsByDifficulty("advanced");
					break;
			}

			// for all difficulties, use words from the appropriate difficulty category
			// mix with some beginner words for variety (except for beginner difficulty)
			if (difficulty == DrillDifficulty.Beginner)
			{
				// Beginner difficulty: use only beginner words
				var shuffledWords = difficultyWords.OrderBy(x => Guid.NewGuid()).ToList();
				return shuffledWords.Take(wordCount).OrderBy(x => Guid.NewGuid()).ToList();
			}
			else
			{
				// intermediate and advanced: mix 70% difficulty words + 30% beginner words
				var difficultyWordsCount = (int)Math.Floor(0.7 * wordCount);
				var beginnerWordsCount = wordCount - difficultyWordsCount; // ensure exact count

				// select random words from each category
				var shuffledDifficultyWords = difficultyWords.OrderBy(x => Guid.NewGuid()).ToList();
				var shuffledBeginnerWords = _wordPoolManager.GetWordsByDifficulty("beginner").OrderBy(x => Guid.NewGuid()).ToList();

				var selectedDifficultyWords = shuffledDifficultyWords.Take(difficultyWordsCount).ToList();
				var selectedBeginnerWords = shuffledBeginnerWords.Take(beginnerWordsCount).ToList();

				// combine and shuffle the final result
				var combinedWords = selectedDifficultyWords.Concat(selectedBeginnerWords).ToList();
				return combinedWords.OrderBy(x => Guid.NewGuid()).ToList();
			}
		}

		public async Task<List<Drill>> GetRecentDrillsAsync(string userId, int count)
		{
			var filter = Builders<Drill>.Filter
				.Eq(d => userId, userId);

			var sort = Builders<Drill>.Sort
				.Descending(d => d.CreatedAt);

			return await _drills.Find(filter)
				.Sort(sort)
				.Limit(count)
				.ToListAsync();
		}
	}
}
