using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using server.Constants;
using server.Data.Mongo;
using server.Entities;
using server.Services.Interfaces;

namespace server.Services
{
	public class ProfileService(MongoDbContext context) : IProfileService
	{
		private readonly IMongoCollection<Profile> _profiles = context.Profiles;
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
	}
}
