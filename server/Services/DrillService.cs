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

		public async Task<List<Drill>> GetRecentDrills(string userId, int count)
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
