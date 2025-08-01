namespace server.Entities.Models
{
    public class PlayerStatistics
    {
        public string UserId { get; set; } = string.Empty;
        public double WPM { get; set; }
        public double Accuracy { get; set; }
        public int WordsCompleted { get; set; }
        public int TotalWords { get; set; }
        public double CompletionPercentage { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
} 