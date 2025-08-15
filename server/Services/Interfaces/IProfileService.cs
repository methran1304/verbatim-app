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
		Task<AiInsight?> GetLastAiInsight(string userId);
		Task<bool> SaveAiInsightAsync(string userId, AIFeedbackDTO aiFeedback);
		
		// book progress methods
		Task<bool> StartBookProgress(string userId, string bookId, int totalWords);
		Task<bool> UpdateBookProgress(string userId, string bookId, int completedWords, bool isCompleted = false);
		Task<bool> ResetBookProgress(string userId, string bookId);
		Task<List<BookProgress>> GetAllBookProgress(string userId);
	}
}
