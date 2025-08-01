using server.Entities.Enums;

namespace server.Entities.Models
{
    public class DrillSubmissionRequest
    {
        public string UserId { get; set; } = string.Empty;
        public CompetitiveDrillType DrillType { get; set; }
        public DrillDifficulty Difficulty { get; set; }
        public int Duration { get; set; }
        public double WPM { get; set; }
        public double Accuracy { get; set; }
        public int WordsCompleted { get; set; }
        public int TotalWords { get; set; }
    }
} 