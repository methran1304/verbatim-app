namespace server.Entities
{
    public class DrillStatistic
    {
        public double WPM { get; set; } = 0;
        public double Accuracy { get; set; } = 0;
        public double AvgWPM { get; set; } = 0;
        public double AvgAccuracy { get; set; } = 0;
        public double MaxWPM { get; set; } = 0;
        public double MaxAccuracy { get; set; } = 0;
        public double ErrorRate { get; set; } = 0;
        public ErrorMap ErrorMap { get; set; } = new();
        public int Corrections { get; set; } = 0;
        public int WordsCount { get; set; } = 0;
        public int LettersCount { get; set; } = 0;
        public int CorrectWords { get; set; } = 0;
        public int CorrectLetters { get; set; } = 0;
        public int IncorrectWords { get; set; } = 0;
        public int IncorrectLetters { get; set; } = 0;
        public int Duration { get; set; } = 0;
        public List<PointTimeData> RealTimeData { get; set; } = new();
    }

    public class ErrorMap
    {
        public Dictionary<string, int> CharErrorMap { get; set; } = new();
        public Dictionary<string, int> WordErrorMap { get; set; } = new();
    }

    public class PointTimeData
    {
        public int TimePoint { get; set; } = 0;
        public double WPM { get; set; } = 0d;
        public double Accuracy { get; set; } = 0d;
        public int Corrections { get; set; } = 0;
        public List<int> IncorrectWords { get; set; } = [];
        public List<int> CorrectWords { get; set; } = [];
    }
}
