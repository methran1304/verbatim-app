using server.Entities.Enums;

namespace server.Entities.Models
{
    public class DrillSubmissionRequestDTO
    {
        public DrillDifficulty DrillDifficulty { get; set; }
        public DrillType DrillType { get; set; }
        public List<string> SourceText { get; set; } = new();
        public List<string> TypedWords { get; set; } = new();
        public DrillStatistic DrillStatistic { get; set; } = new();
        public bool IsCompetitive { get; set; } = false;
        public bool IsClassicsMode { get; set; } = false;
    }

    public class DrillSubmissionResponseDTO
    {
        public string DrillId { get; set; } = string.Empty;
        public StatDifferenceDouble AvgWPM { get; set; } = new();
        public StatDifferenceDouble AvgAccuracy { get; set; } = new();
        public StatDifferenceDouble AvgCorrections { get; set; } = new();
        public StatDifferenceDouble AvgErrorRate { get; set; } = new();
        public StatDifference TotalWords { get; set; } = new();
        public StatDifference TotalLetters { get; set; } = new();
        public StatDifference TotalCorrectWords { get; set; } = new();
        public StatDifference TotalIncorrectWords { get; set; } = new();
        public StatDifference TotalCorrectLetters { get; set; } = new();
        public StatDifference TotalIncorrectLetters { get; set; } = new();
        public StatDifference UserPoints { get; set; } = new();
        public StatDifferenceDouble MaxWPM { get; set; } = new();
        public StatDifferenceDouble MaxAccuracy { get; set; } = new();
        public StatDifference TotalDrillDuration { get; set; } = new();
    }

    public class StatDifference
    {
        public int Current { get; set; } = 0;
        public int New { get; set; } = 0;
        public int Difference => New - Current;
    }

    public class StatDifferenceDouble
    {
        public double Current { get; set; } = 0d;
        public double New { get; set; } = 0d;
        public double Difference => New - Current;
    }
}