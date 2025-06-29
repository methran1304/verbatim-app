using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Entities
{
    public class AiGeneratedDrill
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string AiGeneratedDrillId { get; set; } = null!;

        [BsonElement("user_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = null!;

        [BsonElement("content")]
        public string Content { get; set; } = null!;

        [BsonElement("weakness")]
        public List<string> Weakness { get; set; } = new();

        [BsonElement("generated_at")]
        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
    }
}