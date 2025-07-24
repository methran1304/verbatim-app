using MongoDB.Driver;
using Microsoft.Extensions.Options;
using server.Config;
using server.Entities;
using server.Entities.Core;

namespace server.Data.Mongo
{
	public class MongoDbContext
	{
		private readonly IMongoDatabase _mongoDatabase;
		public MongoDbContext(IOptions<MongoDbSettings> options)
		{
			var client = new MongoClient(options.Value.ConnectionString);
			_mongoDatabase = client.GetDatabase(options.Value.DatabaseName);
		}

		// Auth
		public IMongoCollection<User> Users => _mongoDatabase.GetCollection<User>("users");

		// Core
		public IMongoCollection<Profile> Profiles => _mongoDatabase.GetCollection<Profile>("profiles");
		public IMongoCollection<Drill> Drills => _mongoDatabase.GetCollection<Drill>("drills");
		public IMongoCollection<DrillSourceText> DrillSourceTexts => _mongoDatabase.GetCollection<DrillSourceText>("drillSourceTexts");
		public IMongoCollection<DrillInput> DrillInputs => _mongoDatabase.GetCollection<DrillInput>("drillInputs");
		public IMongoCollection<WordPool> WordPools => _mongoDatabase.GetCollection<WordPool>("wordPools");

		// Competitive
		public IMongoCollection<CompetitiveDrill> CompetitiveDrills => _mongoDatabase.GetCollection<CompetitiveDrill>("competitiveDrills");
		public IMongoCollection<Room> Rooms => _mongoDatabase.GetCollection<Room>("rooms");

		// Adaptive
		public IMongoCollection<WeaknessProfile> WeaknessProfiles => _mongoDatabase.GetCollection<WeaknessProfile>("weaknessProfiles");
		public IMongoCollection<AiGeneratedDrill> AiGeneratedDrills => _mongoDatabase.GetCollection<AiGeneratedDrill>("aiGeneratedDrills");

		// Logging
		public IMongoCollection<ErrorLog> ErrorLog => _mongoDatabase.GetCollection<ErrorLog>("error_log");
	}
}
