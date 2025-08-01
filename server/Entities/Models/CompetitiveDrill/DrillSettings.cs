using server.Entities.Enums;

namespace server.Entities.Models
{
    public class DrillSettings
    {
        public CompetitiveDrillType Type { get; set; } // timed or marathon
        public DrillDifficulty Difficulty { get; set; } // beginner, intermediate, advanced
        public int Duration { get; set; } // seconds (timed)
        public int Length { get; set; } // word count (marathon)
    }
}