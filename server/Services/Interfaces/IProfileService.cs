using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;
using server.Entities.Models;

namespace server.Services.Interfaces
{
	public interface IProfileService
	{
		Task CreateProfileAsync(Profile profile);
		Task<Profile?> GetByUserId(string userId);
		public Task<bool> UpdateProfilePostDrill(string userId, Drill completedDrill);
		Task<bool> UpdateProfilePostCompetitiveDrillAsync(Profile profile);
		Task<AiInsight?> GetLastAiInsight(string userId);
		Task<bool> SaveAiInsightAsync(string userId, AIFeedbackDTO aiFeedback);
		
		// book progress methods
		Task<bool> StartBookProgress(string userId, string bookId, int totalWords);
		Task<bool> UpdateBookProgress(string userId, string bookId, int completedWords, bool isCompleted = false);
		Task<bool> ResetBookProgress(string userId, string bookId);
		Task<List<BookProgress>> GetAllBookProgress(string userId);
		
		// performance data methods
		Task<Dictionary<string, Dictionary<string, int>>> GetActivity(string userId);
		Task<Dictionary<string, Dictionary<string, double>>> GetMetricOverTime(string userId, string timePeriod);
		Task<Dictionary<string, Dictionary<string, int>>> GetDrillDistribution(string userId, string timePeriod);
		
		// profile statistics method
		Task<object> GetProfileStats(string userId);
		
		// AI insight method
		Task<object> GetAIInsight(string userId);
		
		// admin methods for clearing all data
		Task<bool> ClearAllBookProgress();
		Task<bool> ClearAllAiFeedback();
	}
}
