namespace server.Entities.Models
{
    public class DrillResult
    {
        public string UserId { get; set; } = string.Empty;
        public double WPM { get; set; }
        public double Accuracy { get; set; }
        public int WordsCompleted { get; set; }
        public int TotalWords { get; set; }
        public double CompletionPercentage { get; set; }
        public int Position { get; set; }
        public int PointsChange { get; set; }
        public DateTime FinishedAt { get; set; } = DateTime.UtcNow;
    }
} 