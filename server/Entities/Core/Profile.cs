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

        // Competitive stats
        [BsonElement("competitive_points")]
        public int CompetitivePoints { get; set; } = 0;

        [BsonElement("competitive_drills")]
        public int CompetitiveDrills { get; set; } = 0;

        [BsonElement("wins")]
        public int Wins { get; set; } = 0;

        [BsonElement("losses")]
        public int Losses { get; set; } = 0;

        [BsonElement("max_competitive_wpm")]
        public double MaxCompetitiveWpm { get; set; } = 0;

        [BsonElement("avg_competitive_accuracy")]
        public double AvgCompetitiveAccuracy { get; set; } = 0;
    }
}