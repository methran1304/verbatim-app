using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Entities.Enums;

namespace server.Entities.Models
{
    public class DrillSettings
    {
        [BsonElement("type")]
        [BsonRepresentation(BsonType.String)]
        public CompetitiveDrillType Type { get; set; } // timed or marathon
        
        [BsonElement("difficulty")]
        [BsonRepresentation(BsonType.String)]
        public DrillDifficulty Difficulty { get; set; } // beginner, intermediate, advanced
        
        [BsonElement("duration")]
        public int Duration { get; set; } // seconds (timed)
        
        [BsonElement("length")]
        public int Length { get; set; } // word count (marathon)
    }
}