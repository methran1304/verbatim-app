using MongoDB.Driver;
using server.Data.Mongo;
using server.Entities;
using server.Services.Interfaces;

namespace server.Services
{
	public class DrillService(MongoDbContext context) : IDrillService
	{
		private readonly IMongoCollection<Drill> _drills = context.Drills;

		public async Task CreateDrillAsync(Drill drill)
		{
			await _drills.InsertOneAsync(drill);
		}

		public async Task<List<Drill>> GetAllDrillsAsync(string userId)
		{
			return await _drills.Find(d => d.UserId == userId).ToListAsync();
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
