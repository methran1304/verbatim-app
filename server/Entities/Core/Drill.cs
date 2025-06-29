using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Entities.Enums;

namespace server.Entities
{
    public class Drill
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string DrillId { get; set; } = null!;

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("drill_type")]
        public DrillType DrillType { get; set; }

        [BsonElement("user_id")]
        public string UserId { get; set; } = null!;

        [BsonElement("points_gained")] // only applicable for non-competitive modes
        public int PointsGained { get; set; } = 0;
    }
}