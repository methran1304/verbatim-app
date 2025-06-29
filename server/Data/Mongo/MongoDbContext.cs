using MongoDB.Driver;
using Microsoft.Extensions.Options;
using server.Config;
using server.Entities;

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

        public IMongoCollection<User> Users => _mongoDatabase.GetCollection<User>("users");
        public IMongoCollection<Profile> Profiles => _mongoDatabase.GetCollection<Profile>("profiles");
        public IMongoCollection<Drill> Drills => _mongoDatabase.GetCollection<Drill>("drills");
        public IMongoCollection<CompetitiveDrill> CompetitiveDrills => _mongoDatabase.GetCollection<CompetitiveDrill>("competitiveDrills");
        public IMongoCollection<Room> Rooms => _mongoDatabase.GetCollection<Room>("rooms");
        public IMongoCollection<WeaknessProfile> WeaknessProfiles => _mongoDatabase.GetCollection<WeaknessProfile>("weaknessProfiles");
        public IMongoCollection<AiGeneratedDrill> AiGeneratedDrills => _mongoDatabase.GetCollection<AiGeneratedDrill>("aiGeneratedDrills");
    }
}