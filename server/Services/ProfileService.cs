using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using server.Constants;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Models;
using server.Entities.Enums;
using server.Services.Interfaces;
using System.Globalization;

namespace server.Services
{
	public class ProfileService(MongoDbContext context, IBookService bookService, IUserService userService) : IProfileService
	{
		private readonly IMongoCollection<Profile> _profiles = context.Profiles;
		private readonly IBookService _bookService = bookService;
		private readonly IUserService _userService = userService;
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

			
			if (profile.AiInsightDetails == null)
			{
				
				profile.AiInsightDetails = new AiInsight
				{
					LastGeneratedAt = DateTime.UtcNow,
					Insight = aiFeedback,
					AiInsightsGeneratedToday = 1
				};
			}
			else
			{
				profile.AiInsightDetails.LastGeneratedAt = DateTime.UtcNow;
				profile.AiInsightDetails.Insight = aiFeedback;
				profile.AiInsightDetails.AiInsightsGeneratedToday++;
			}

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

		// performance data methods
		// Months -> Days of Week -> Number of drills
		// Jan -> [M: 5,]
		public async Task<Dictionary<string, Dictionary<string, int>>> GetActivity(string userId)
		{
			try
			{
				// await PopulateDrillsWithTestData();
				// get data for last 365 days (1 year)
				var startDate = DateTime.UtcNow.AddDays(-365);

				var filter = Builders<Drill>.Filter.And(
					Builders<Drill>.Filter.Eq(d => d.UserId, userId),
					Builders<Drill>.Filter.Gte(d => d.CreatedAt, startDate)
				);

				var drills = await context.Drills.Find(filter).SortBy(x => x.CreatedAt).ToListAsync();

				var activityData = new Dictionary<string, Dictionary<string, int>>();

				foreach (var drill in drills)
				{
					var drillDate = drill.CreatedAt.ToString("dd-MM-yyyy");
					var monthName = drill.CreatedAt.ToString("MMM", CultureInfo.InvariantCulture);

					if (!activityData.ContainsKey(monthName))
					{
						activityData[monthName] = new Dictionary<string, int>();
					}

					if (activityData[monthName].ContainsKey(drillDate))
						activityData[monthName][drillDate]++;
					else
						activityData[monthName][drillDate] = 1;
				}

				return activityData;
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error getting activity data: {ex.Message}");
				return new Dictionary<string, Dictionary<string, int>>();
			}
		}

		public async Task<Dictionary<string, Dictionary<string, double>>> GetMetricOverTime(string userId, string timePeriod)
		{
			try
			{
				var startDate = GetStartDateForTimePeriod(timePeriod);
				
				var filter = Builders<Drill>.Filter.And(
					Builders<Drill>.Filter.Eq(d => d.UserId, userId),
					Builders<Drill>.Filter.Gte(d => d.CreatedAt, startDate),
					Builders<Drill>.Filter.Lte(d => d.CreatedAt, DateTime.UtcNow)
				);

				var drills = await context.Drills.Find(filter).ToListAsync();
				
				var metricsData = new Dictionary<string, Dictionary<string, double>>();
				
				foreach (var drill in drills)
				{
					var dateKey = drill.CreatedAt.ToString("yyyy-MM-dd");
					if (!metricsData.ContainsKey(dateKey))
					{
						metricsData[dateKey] = new Dictionary<string, double>
						{
							{ "drill_count", 0 },
							{ "total_wpm", 0 },
							{ "total_accuracy", 0 }
						};
					}
					
					metricsData[dateKey]["drill_count"]++;
					metricsData[dateKey]["total_wpm"] += drill.Statistics.WPM;
					metricsData[dateKey]["total_accuracy"] += drill.Statistics.Accuracy;
				}
				
				// calculate averages
				var result = new Dictionary<string, Dictionary<string, double>>();
				foreach (var kvp in metricsData)
				{
					var drillCount = kvp.Value["drill_count"];
					result[kvp.Key] = new Dictionary<string, double>
					{
						{ "avg_wpm", drillCount > 0 ? kvp.Value["total_wpm"] / drillCount : 0 },
						{ "avg_acc", drillCount > 0 ? kvp.Value["total_accuracy"] / drillCount : 0 }
					};
				}
				
				return result;
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error getting metrics over time: {ex.Message}");
				return new Dictionary<string, Dictionary<string, double>>();
			}
		}

		public async Task<Dictionary<string, Dictionary<string, int>>> GetDrillDistribution(string userId, string timePeriod)
		{
			try
			{
				var startDate = GetStartDateForTimePeriod(timePeriod);
				
				var filter = Builders<Drill>.Filter.And(
					Builders<Drill>.Filter.Eq(d => d.UserId, userId),
					Builders<Drill>.Filter.Gte(d => d.CreatedAt, startDate)
				);

				var drills = await context.Drills.Find(filter).ToListAsync();
				
				var drillTypes = new Dictionary<string, int>
				{
					{ "timed", 0 },
					{ "marathon", 0 },
					{ "adaptive", 0 }
				};
				
				var drillDifficulties = new Dictionary<string, int>
				{
					{ "beginner", 0 },
					{ "intermediate", 0 },
					{ "advanced", 0 }
				};
				
				foreach (var drill in drills)
				{
					// count drill types (excluding Classics and Competitive)
					if (drill.DrillType == DrillType.Timed)
						drillTypes["timed"]++;
					else if (drill.DrillType == DrillType.Marathon)
						drillTypes["marathon"]++;
					else if (drill.DrillType == DrillType.Adaptive)
						drillTypes["adaptive"]++;
					
					// count difficulties (only for non-competitive drills)
					if (drill.DrillDifficulty.HasValue)
					{
						switch (drill.DrillDifficulty.Value)
						{
							case DrillDifficulty.Beginner:
								drillDifficulties["beginner"]++;
								break;
							case DrillDifficulty.Intermediate:
								drillDifficulties["intermediate"]++;
								break;
							case DrillDifficulty.Advanced:
								drillDifficulties["advanced"]++;
								break;
						}
					}
				}
				
				return new Dictionary<string, Dictionary<string, int>>
				{
					{ "drillTypes", drillTypes },
					{ "drillDifficulty", drillDifficulties }
				};
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error getting drill distribution: {ex.Message}");
				return new Dictionary<string, Dictionary<string, int>>
				{
					{ "drillTypes", new Dictionary<string, int>() },
					{ "drillDifficulty", new Dictionary<string, int>() }
				};
			}
		}

		private DateTime GetStartDateForTimePeriod(string timePeriod)
		{
			var now = DateTime.UtcNow;
			return timePeriod switch
			{
				"week" => now.AddDays(-7),
				"month" => now.AddDays(-30),
				"year" => now.AddDays(-365),
				_ => now.AddDays(-7) // default to week
			};
		}

		// Method to populate drills collection with test data
		public async Task<bool> PopulateDrillsWithTestData()
		{
			try
			{
				const string userId = "688d50268b237373e8404abb";
				
				// first, clear all existing drills for this user
				var deleteFilter = Builders<Drill>.Filter.Eq(d => d.UserId, userId);
				var deleteResult = await context.Drills.DeleteManyAsync(deleteFilter);
				Console.WriteLine($"Cleared {deleteResult.DeletedCount} existing drills for user {userId}");
				
				var random = new Random();
				var drills = new List<Drill>();
				
				// generate data from January 1, 2025 to November 30, 2025
				var startDate = new DateTime(2024, 10, 1);
				var endDate = new DateTime(2025, 9, 30);
				var currentDate = startDate;
				
				while (currentDate <= endDate)
				{
					// skip some days to create gaps (no drills on some days)
					if (random.Next(1, 101) <= 15) // 15% chance of no drills
					{
						currentDate = currentDate.AddDays(1);
						continue;
					}
					
					// generate 1 to 100+ drills per day
					var drillsPerDay = random.Next(1, 101);
					
					for (int i = 0; i < drillsPerDay; i++)
					{
						var drill = new Drill
						{
							UserId = userId,
							CreatedAt = currentDate.AddHours(random.Next(0, 24)).AddMinutes(random.Next(0, 60)),
							DrillType = GetRandomDrillType(random),
							DrillDifficulty = GetRandomDrillDifficulty(random),
							SourceTextId = $"source_{Guid.NewGuid().ToString("N")[..8]}",
							DrillInputId = $"input_{Guid.NewGuid().ToString("N")[..8]}",
							PointsGained = random.Next(10, 100),
							Statistics = new DrillStatistic
							{
								WPM = random.Next(30, 120),
								Accuracy = random.Next(70, 100),
								AvgWPM = random.Next(30, 120),
								AvgAccuracy = random.Next(70, 100),
								MaxWPM = random.Next(80, 150),
								MaxAccuracy = random.Next(85, 100),
								ErrorRate = random.Next(0, 30),
								Corrections = random.Next(0, 20),
								WordsCount = random.Next(50, 500),
								LettersCount = random.Next(200, 2000),
								CorrectWords = random.Next(40, 480),
								CorrectLetters = random.Next(180, 1900),
								IncorrectWords = random.Next(0, 50),
								IncorrectLetters = random.Next(0, 200),
								Duration = random.Next(60, 1800) // 1 minute to 30 minutes
							}
						};
						
						drills.Add(drill);
					}
					
					currentDate = currentDate.AddDays(1);
				}
				
				// insert all drills in batches
				if (drills.Any())
				{
					await context.Drills.InsertManyAsync(drills);
					Console.WriteLine($"Successfully inserted {drills.Count} test drills for user {userId}");
					return true;
				}
				
				return false;
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error populating drills with test data: {ex.Message}");
				return false;
			}
		}
		
		private DrillType GetRandomDrillType(Random random)
		{
			var types = new[] { DrillType.Timed, DrillType.Marathon, DrillType.Adaptive };
			return types[random.Next(types.Length)];
		}
		
		private DrillDifficulty GetRandomDrillDifficulty(Random random)
		{
			var difficulties = new[] { DrillDifficulty.Beginner, DrillDifficulty.Intermediate, DrillDifficulty.Advanced };
			return difficulties[random.Next(difficulties.Length)];
		}
		
		// get comprehensive profile statistics
		public async Task<object> GetProfileStats(string userId)
		{
			try
			{
				var profile = await GetByUserId(userId);
				if (profile == null)
				{
					return new { message = "Profile not found" };
				}
				
				// get drill distribution data
				var drillDistribution = await GetDrillDistribution(userId, "year");
				var user = await _userService.GetByUserId(userId);

				// create result object using profile properties and append additional data
				var result = new
				{
					// profile properties (using Pascal case to match C# property names)
					profile.MaxWPM,
					profile.MaxAccuracy,
					profile.AvgWPM,
					profile.AvgAccuracy,
					profile.AvgCorrections,
					profile.AvgErrorRate,
					profile.UserPoints,
					profile.CompetitiveDrills,
					profile.Wins,
					profile.Losses,
					profile.TotalDrillsParticipated,
					profile.TotalWords,
					profile.TotalCorrectWords,
					profile.TotalIncorrectWords,
					profile.TotalLetters,
					profile.TotalCorrectLetters,
					profile.TotalIncorrectLetters,
					profile.TotalDrillDuration,
					
					// user information
					Username = user?.Username,
					EmailAddress = user?.EmailAddress,
					MemberSince = user?.CreatedAt,
					
					// additional drill distribution data
					DrillsByType = drillDistribution.ContainsKey("drillTypes") 
						? drillDistribution["drillTypes"] 
						: new Dictionary<string, int>(),
					DrillsByDifficulty = drillDistribution.ContainsKey("drillDifficulty") 
						? drillDistribution["drillDifficulty"] 
						: new Dictionary<string, int>()
				};
				
				return result;
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error getting profile stats: {ex.Message}");
				return new { message = "Error retrieving profile statistics" };
			}
		}
		
		// get AI insight for a user
		public async Task<object> GetAIInsight(string userId)
		{
			try
			{
				var profile = await GetByUserId(userId);
				if (profile == null)
				{
					return new { message = "Profile not found" };
				}
				
				var aiInsight = profile.AiInsightDetails;
				if (aiInsight == null)
				{
					return new
					{
						lastGeneratedAt = DateTime.UtcNow,
						insight = (object)null,
						aiInsightsGeneratedToday = 0
					};
				}
				
				return new
				{
					lastGeneratedAt = aiInsight.LastGeneratedAt,
					insight = aiInsight.Insight,
					aiInsightsGeneratedToday = aiInsight.AiInsightsGeneratedToday
				};
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error getting AI insight: {ex.Message}");
				return new { message = "Error retrieving AI insight" };
			}
		}
	}
}
