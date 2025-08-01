using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Entities.Core
{
    public class DrillSourceText
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string DrillSourceId { get; set; } = null!;

        [BsonElement("source_text")]
        public List<string> SourceText { get; set; } = null!;
    }
}