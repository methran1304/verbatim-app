using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Entities
{
    public class CompetitiveDrill
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string CompetitiveDrillId { get; set; } = null!;


        [BsonElement("winner_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string WinnerId { get; set; } = null!;

        [BsonElement("room_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string RoomId { get; set; } = null!;

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("created_by")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string CreatedBy { get; set; } = null!;

        [BsonElement("players")]
        public List<CompetitiveDrillPlayer> CompetitiveDrillPlayers { get; set; } = new();
    }

    public class CompetitiveDrillPlayer
    {
        [BsonElement("user_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = null!;

        [BsonElement("wpm")]
        public double WPM { get; set; }

        [BsonElement("accuracy")]
        public double Accuracy { get; set; }

        [BsonElement("position")]
        public int Position { get; set; }

        [BsonElement("points_change")]
        public int PointsChange { get; set; }

        [BsonElement("drill_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string DrillId { get; set; } = null!;
    }
}