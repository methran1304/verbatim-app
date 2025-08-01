namespace server.Entities.Models
{
    public class FeedbackStatisticsDTO
    {
        public Dictionary<string, int> WordErrorMap { get; set; } = new();
        public Dictionary<string, int> CharErrorMap { get; set; } = new();
        public PerformanceMetricsDTO PerformanceMetrics { get; set; } = new();
        public List<DrillTypeAnalysisDTO> DrillTypeAnalysis { get; set; } = new();
        public List<DifficultyAnalysisDTO> DifficultyAnalysis { get; set; } = new();
        public TimeAnalysisDTO TimeAnalysis { get; set; } = new();
        public CorrectionAnalysisDTO CorrectionAnalysis { get; set; } = new();
    }

    public class PerformanceMetricsDTO
    {
        public int TotalDrills { get; set; }
        public int TotalWords { get; set; }
        public int TotalLetters { get; set; }
        public int TotalDuration { get; set; }
        public int TotalCorrections { get; set; }
        public double AverageWPM { get; set; }
        public double AverageAccuracy { get; set; }
        public double AverageErrorRate { get; set; }
        public double MaxWPM { get; set; }
        public double MaxAccuracy { get; set; }
        public int TotalCorrectWords { get; set; }
        public int TotalIncorrectWords { get; set; }
        public int TotalCorrectLetters { get; set; }
        public int TotalIncorrectLetters { get; set; }
    }

    public class DrillTypeAnalysisDTO
    {
        public string DrillType { get; set; } = string.Empty;
        public int Count { get; set; }
        public double AverageWPM { get; set; }
        public double AverageAccuracy { get; set; }
        public int TotalErrors { get; set; }
    }

    public class DifficultyAnalysisDTO
    {
        public string Difficulty { get; set; } = string.Empty;
        public int Count { get; set; }
        public double AverageWPM { get; set; }
        public double AverageAccuracy { get; set; }
        public int TotalErrors { get; set; }
    }

    public class TimeAnalysisDTO
    {
        public List<object> RecentDrills { get; set; } = new();
        public List<object> OlderDrills { get; set; } = new();
        public double RecentAverageWPM { get; set; }
        public double RecentAverageAccuracy { get; set; }
    }

    public class RealTimePatternDTO
    {
        public int TimePoint { get; set; }
        public double AverageWPM { get; set; }
        public double AverageAccuracy { get; set; }
        public int TotalCorrections { get; set; }
    }

    public class CorrectionAnalysisDTO
    {
        public double AverageCorrectionsPerDrill { get; set; }
        public int DrillsWithHighCorrections { get; set; }
        public double CorrectionRate { get; set; }
    }
}