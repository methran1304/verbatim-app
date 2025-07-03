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

		/*
			profile:
				max_wpm: current wpm > max /
				max_acc: current_acc > max /
				avg_wpm: avg_wpm + (new_wpm - avg_wpm) / total_drill
				avg_acc: avg_acc + (new_acc - avg_acc) / total_drill
				activity[]: <- drill_id
				casual_points: +points_gained
				drills_participated: +1
		*/
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
				(completedDrill.WPM - currentProfile.AvgWPM) /
				(currentProfile.TotalDrillsParticipated + 1)
			);

			var newAvgAcc = currentProfile.AvgAccuracy + (
				(completedDrill.Accuracy - currentProfile.AvgAccuracy) /
				(currentProfile.TotalDrillsParticipated + 1)
			);


			var updateDefinition = Builders<Profile>
				.Update
				.Max(p => p.MaxAccuracy, completedDrill.Accuracy)
				.Max(p => p.MaxWPM, completedDrill.WPM)
				.Set(p => p.AvgAccuracy, newAvgAcc)
				.Set(p => p.AvgWPM, newAvgWPM)
				.Inc($"drills_participated.{completedDrill.DrillType}", 1)
				.Inc("total_drills_participated", 1)
				.Inc("casual_points", completedDrill.PointsGained)
				.Push($"activity.{today}", completedDrill.DrillId);

			var updateResult = await _profiles.UpdateOneAsync(userFilter, updateDefinition);

			return updateResult.IsAcknowledged;
		}
	}
}
