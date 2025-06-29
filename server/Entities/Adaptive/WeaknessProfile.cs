using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Entities
{
    public class WeaknessProfile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = null!;

        [BsonElement("weak_keys")]
        public List<string> WeakKeys { get; set; } = new();

        [BsonElement("weak_bigrams")]
        public List<string> WeakBigrams { get; set; } = new();

        [BsonElement("last_updated")]
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    }
}