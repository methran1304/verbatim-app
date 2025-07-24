using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Entities.Core
{
    public class WordPool
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("short")]
        public List<string> Short { get; set; } = new List<string>();

        [BsonElement("medium")]
        public List<string> Medium { get; set; } = new List<string>();

        [BsonElement("long")]
        public List<string> Long { get; set; } = new List<string>();

        [BsonElement("lastUpdated")]
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    }
} 