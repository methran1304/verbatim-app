using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Entities.Core
{
    public class WordPool
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("beginner")]
        public List<string> Beginner { get; set; } = new List<string>();

        [BsonElement("intermediate")]
        public List<string> Intermediate { get; set; } = new List<string>();

        [BsonElement("advanced")]
        public List<string> Advanced { get; set; } = new List<string>();

        [BsonElement("lastUpdated")]
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    }
} 