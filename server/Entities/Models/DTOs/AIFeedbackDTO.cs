using System.Text.Json.Serialization;

namespace server.Entities.Models
{
    public class AIFeedbackDTO
    {
        [JsonPropertyName("performanceSummary")]
        public PerformanceSummaryDTO PerformanceSummary { get; set; } = new();

        [JsonPropertyName("wordLevelAnalysis")]
        public WordLevelAnalysisDTO WordLevelAnalysis { get; set; } = new();

        [JsonPropertyName("characterLevelAnalysis")]
        public CharacterLevelAnalysisDTO CharacterLevelAnalysis { get; set; } = new();

        [JsonPropertyName("recentTrends")]
        public RecentTrendsDTO RecentTrends { get; set; } = new();

        [JsonPropertyName("immediateActions")]
        public ImmediateActionsDTO ImmediateActions { get; set; } = new();
    }

    public class PerformanceSummaryDTO
    {
        [JsonPropertyName("overallLevel")]
        public string OverallLevel { get; set; } = string.Empty;

        [JsonPropertyName("currentWPM")]
        public double CurrentWPM { get; set; }

        [JsonPropertyName("currentAccuracy")]
        public double CurrentAccuracy { get; set; }

        [JsonPropertyName("totalDrills")]
        public int TotalDrills { get; set; }

        [JsonPropertyName("trend")]
        public string Trend { get; set; } = string.Empty;

        [JsonPropertyName("improvementNeeded")]
        public string ImprovementNeeded { get; set; } = string.Empty;
    }

    public class WordLevelAnalysisDTO
    {
        [JsonPropertyName("topErrorWords")]
        public List<ErrorWordDTO> TopErrorWords { get; set; } = new();

        [JsonPropertyName("wordPatterns")]
        public List<WordPatternDTO> WordPatterns { get; set; } = new();
    }

    public class ErrorWordDTO
    {
        [JsonPropertyName("word")]
        public string Word { get; set; } = string.Empty;

        [JsonPropertyName("errorCount")]
        public int ErrorCount { get; set; }

        [JsonPropertyName("pattern")]
        public string Pattern { get; set; } = string.Empty;

        [JsonPropertyName("likelyCause")]
        public string LikelyCause { get; set; } = string.Empty;

        [JsonPropertyName("similarWords")]
        public List<string> SimilarWords { get; set; } = new();
    }

    public class WordPatternDTO
    {
        [JsonPropertyName("pattern")]
        public string Pattern { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("affectedWords")]
        public List<string> AffectedWords { get; set; } = new();

        [JsonPropertyName("frequency")]
        public int Frequency { get; set; }
    }

    public class CharacterLevelAnalysisDTO
    {
        [JsonPropertyName("topErrorChars")]
        public List<ErrorCharDTO> TopErrorChars { get; set; } = new();

        [JsonPropertyName("keyboardWeaknesses")]
        public List<KeyboardWeaknessDTO> KeyboardWeaknesses { get; set; } = new();
    }

    public class ErrorCharDTO
    {
        [JsonPropertyName("character")]
        public string Character { get; set; } = string.Empty;

        [JsonPropertyName("errorCount")]
        public int ErrorCount { get; set; }

        [JsonPropertyName("keyboardZone")]
        public string KeyboardZone { get; set; } = string.Empty;

        [JsonPropertyName("finger")]
        public string Finger { get; set; } = string.Empty;

        [JsonPropertyName("commonMistakes")]
        public List<string> CommonMistakes { get; set; } = new();
    }

    public class KeyboardWeaknessDTO
    {
        [JsonPropertyName("zone")]
        public string Zone { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("errorRate")]
        public double ErrorRate { get; set; }

        [JsonPropertyName("affectedChars")]
        public List<string> AffectedChars { get; set; } = new();
    }

    public class RecentTrendsDTO
    {
        [JsonPropertyName("wpmTrend")]
        public string WpmTrend { get; set; } = string.Empty;

        [JsonPropertyName("accuracyTrend")]
        public string AccuracyTrend { get; set; } = string.Empty;

        [JsonPropertyName("errorPatterns")]
        public List<string> ErrorPatterns { get; set; } = new();

        [JsonPropertyName("improvingAreas")]
        public List<string> ImprovingAreas { get; set; } = new();

        [JsonPropertyName("decliningAreas")]
        public List<string> DecliningAreas { get; set; } = new();
    }

    public class ImmediateActionsDTO
    {
        [JsonPropertyName("criticalIssues")]
        public List<string> CriticalIssues { get; set; } = new();

        [JsonPropertyName("quickFixes")]
        public List<string> QuickFixes { get; set; } = new();

        [JsonPropertyName("nextDrillFocus")]
        public List<string> NextDrillFocus { get; set; } = new();
    }
}