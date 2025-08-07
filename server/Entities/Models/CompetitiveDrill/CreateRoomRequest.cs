using System.Text.Json.Serialization;
using server.Entities.Enums;

namespace server.Entities.Models
{
    public class CreateRoomRequest
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public CompetitiveDrillType Type { get; set; }
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public DrillDifficulty Difficulty { get; set; }
        
        public int? Duration { get; set; } // seconds (timed)
        public int? Length { get; set; } // word count (marathon)
    }
} 