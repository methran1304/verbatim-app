using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Entities
{
    public class Profile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProfileId { get; set; } = null!; // should match UserId

        [BsonElement("max_wpm")]
        public double MaxWPM { get; set; } = 0;

        [BsonElement("avg_wpm")]
        public double AvgWPM { get; set; } = 0;

        [BsonElement("avg_accuracy")]
        public double AvgAccuracy { get; set; } = 0;

        // date => list of drill IDs
        [BsonElement("activity")]
        public Dictionary<string, List<string>> Activity { get; set; } = new();

        [BsonElement("casual_points")]
        public int CasualPoints { get; set; } = 0;

        [BsonElement("drills_participated")]
        public int DrillsParticipated { get; set; } = 0;
    }
}