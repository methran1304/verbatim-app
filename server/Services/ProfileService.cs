using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using server.Constants;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Models;
using server.Services.Interfaces;

namespace server.Services
{
	public class ProfileService(MongoDbContext context, IBookService bookService) : IProfileService
	{
		private readonly IMongoCollection<Profile> _profiles = context.Profiles;
		private readonly IBookService _bookService = bookService;
		public async Task CreateProfileAsync(Profile profile)
		{
			await _profiles.InsertOneAsync(profile);
		}

		public async Task<Profile?> GetByUserId(string userId)
		{
			var filter = Builders<Profile>
				.Filter
				.Eq(p => p.ProfileId, userId);

			return await _profiles.Find(filter).FirstOrDefaultAsync();
		}
		
		public async Task<bool> UpdateProfilePostDrill(string userId, Drill completedDrill)
		{
			var userFilter = Builders<Profile>
				.Filter
				.Eq(p => p.ProfileId, userId);

			var currentProfile = await _profiles.Find(userFilter).FirstOrDefaultAsync();

			if (currentProfile is null)
				return false;

			var today = DateTime.UtcNow.ToString(DrillConstants.ActivityDateFormat);

			var newAvgWPM = currentProfile.AvgWPM + (
				(completedDrill.Statistics.WPM - currentProfile.AvgWPM) /
				(currentProfile.TotalDrillsParticipated + 1)
			);

			var newAvgAcc = currentProfile.AvgAccuracy + (
				(completedDrill.Statistics.Accuracy - currentProfile.AvgAccuracy) /
				(currentProfile.TotalDrillsParticipated + 1)
			);

			var newAvgCorrections = currentProfile.AvgCorrections + (
				(completedDrill.Statistics.Corrections - currentProfile.AvgCorrections) /
				(currentProfile.TotalDrillsParticipated + 1)
			);

			var newErrorRate = currentProfile.AvgErrorRate + (
				(completedDrill.Statistics.ErrorRate - currentProfile.AvgErrorRate) /
				(currentProfile.TotalDrillsParticipated + 1)
			);


			var updateDefinition = Builders<Profile>
				.Update
				.Max(p => p.MaxAccuracy, completedDrill.Statistics.Accuracy)
				.Max(p => p.MaxWPM, completedDrill.Statistics.WPM)
				.Set(p => p.AvgAccuracy, newAvgAcc)
				.Set(p => p.AvgWPM, newAvgWPM)
				.Set(p => p.AvgCorrections, newAvgCorrections)
				.Set(p => p.AvgErrorRate, newErrorRate)
				.Inc($"drills_participated.{completedDrill.DrillType}", 1)
				.Inc("total_drills_participated", 1)
				.Inc("user_points", completedDrill.PointsGained)
				.Inc("total_words", completedDrill.Statistics.WordsCount)
				.Inc("total_correct_words", completedDrill.Statistics.CorrectWords)
				.Inc("total_incorrect_words", completedDrill.Statistics.IncorrectWords)
				.Inc("total_letters", completedDrill.Statistics.LettersCount)
				.Inc("total_correct_letters", completedDrill.Statistics.CorrectLetters)
				.Inc("total_incorrect_letters", completedDrill.Statistics.IncorrectLetters)
				.Push($"activity.{today}", completedDrill.DrillId)
				.Inc("total_drill_duration", completedDrill.Statistics.Duration);

			var updateResult = await _profiles.UpdateOneAsync(userFilter, updateDefinition);

			return updateResult.IsAcknowledged;
		}

		public async Task<AiInsight?> GetLastAiInsight(string userId)
		{
			var profile = await _profiles.Find(p => p.ProfileId == userId).FirstOrDefaultAsync();
			if (profile is null)
				return null;

			return profile.AiInsightDetails;
		}

		public async Task<bool> SaveAiInsightAsync(string userId, AIFeedbackDTO aiFeedback)
		{
			var profile = await _profiles.Find(p => p.ProfileId == userId).FirstOrDefaultAsync();
			if (profile is null)
				return false;

			profile.AiInsightDetails = new AiInsight
			{
				LastGeneratedAt = DateTime.UtcNow,
				Insight = aiFeedback
			};

			var result = await _profiles.UpdateOneAsync(p => p.ProfileId == userId, Builders<Profile>.Update.Set(p => p.AiInsightDetails, profile.AiInsightDetails));

			return result.IsAcknowledged;
		}

		        // book progress methods
		public async Task<bool> StartBookProgress(string userId, string bookId, int totalWords)
		{
			var profile = await _profiles.Find(p => p.ProfileId == userId).FirstOrDefaultAsync();
			if (profile is null)
				return false;

			            // check if book progress already exists
			var existingProgress = profile.BookProgress.FirstOrDefault(bp => bp.BookId == bookId);
			if (existingProgress != null)
			{
				                // book already started, just update total words if different
				if (existingProgress.TotalWords != totalWords)
				{
					existingProgress.TotalWords = totalWords;
				}
			}
			else
			{
				            // add new book progress entry
				var newBookProgress = new BookProgress
				{
					BookId = bookId,
					TotalWords = totalWords,
					CompletedWords = 0,
					IsCompleted = false
				};
				profile.BookProgress.Add(newBookProgress);
			}

			var result = await _profiles.UpdateOneAsync(
				p => p.ProfileId == userId,
				Builders<Profile>.Update.Set(p => p.BookProgress, profile.BookProgress)
			);

			return result.IsAcknowledged;
		}

		public async Task<bool> UpdateBookProgress(string userId, string bookId, int completedWords, bool isCompleted = false)
		{
			var profile = await _profiles.Find(p => p.ProfileId == userId).FirstOrDefaultAsync();
			if (profile is null || profile.BookProgress == null)
				return false;

			var bookProgress = profile.BookProgress.FirstOrDefault(bp => bp.BookId == bookId);
			if (bookProgress == null)
				return false;

			bookProgress.CompletedWords = completedWords;
			bookProgress.IsCompleted = isCompleted;

			var result = await _profiles.UpdateOneAsync(
				p => p.ProfileId == userId,
				Builders<Profile>.Update.Set(p => p.BookProgress, profile.BookProgress)
			);

			return result.IsAcknowledged;
		}

		public async Task<bool> ResetBookProgress(string userId, string bookId)
		{
			var profile = await _profiles.Find(p => p.ProfileId == userId).FirstOrDefaultAsync();
			if (profile is null || profile.BookProgress == null)
				return false;

			var bookProgress = profile.BookProgress.FirstOrDefault(bp => bp.BookId == bookId);
			if (bookProgress == null)
				return false;

			            // reset progress but keep the entry
			bookProgress.CompletedWords = 0;
			bookProgress.IsCompleted = false;

			var result = await _profiles.UpdateOneAsync(
				p => p.ProfileId == userId,
				Builders<Profile>.Update.Set(p => p.BookProgress, profile.BookProgress)
			);

			return result.IsAcknowledged;
		}

		public async Task<List<BookProgress>> GetAllBookProgress(string userId)
		{
			var profile = await _profiles.Find(p => p.ProfileId == userId).FirstOrDefaultAsync();

			if (profile is null)
				return new List<BookProgress>();

			            // get all books to get their total word counts
            var allBooks = await _bookService.GetAllBooksAsync(1, 1000); // get all books
			if (allBooks == null || !allBooks.Any())
				return new List<BookProgress>();

			var result = new List<BookProgress>();

			foreach (var book in allBooks)
			{
				var existingProgress = profile.BookProgress?.FirstOrDefault(bp => bp.BookId == book.Id);

				if (existingProgress != null)
				{
					                // only include books that have actually been started (have progress)
                // update with actual book data and keep progress
					existingProgress.TotalWords = book.TotalWordCount;
					result.Add(existingProgress);
				}
				                // don't create default progress for books not started
                // this way, books without progress will show "Start" button
			}

			return result;
		}
		
		// admin methods for clearing all data across all users
		public async Task<bool> ClearAllBookProgress()
		{
			try
			{
				// update all profiles to clear book progress
				var updateDefinition = Builders<Profile>.Update.Set(p => p.BookProgress, new List<BookProgress>());
				var result = await _profiles.UpdateManyAsync(
					Builders<Profile>.Filter.Empty, // empty filter means all documents
					updateDefinition
				);
				
				return result.IsAcknowledged;
			}
			catch (Exception ex)
			{
				// log the exception (you might want to add proper logging here)
				Console.WriteLine($"Error clearing all book progress: {ex.Message}");
				return false;
			}
		}
		
		public async Task<bool> ClearAllAiFeedback()
		{
			try
			{
				// update all profiles to clear AI insights
				var updateDefinition = Builders<Profile>.Update.Set(p => p.AiInsightDetails, new AiInsight());
				var result = await _profiles.UpdateManyAsync(
					Builders<Profile>.Filter.Empty, // empty filter means all documents
					updateDefinition
				);
				
				return result.IsAcknowledged;
			}
			catch (Exception ex)
			{
				// log the exception (you might want to add proper logging here)
				Console.WriteLine($"Error clearing all AI feedback: {ex.Message}");
				return false;
			}
		}
	}
}
