namespace server.Entities
{
    public class DrillStatistic
    {
        public double WPM { get; set; } = 0;
        public double Accuracy { get; set; } = 0;
        public ErrorMap ErrorMap { get; set; } = new();
        public int Corrections { get; set; } = 0;
        public int WordCount { get; set; } = 0;
        public int CorrectWordCount { get; set; } = 0;
        public int IncorrectWordCount { get; set; } = 0;
        public int LetterCount { get; set; } = 0;
        public int CorrectLetterCount { get; set; } = 0;
        public int IncorrectLetterCount { get; set; } = 0;
    }

    public class ErrorMap
    {
        public Dictionary<string, int> CharErrorMap { get; set; } = new();
        public Dictionary<string, int> WordErrorMap { get; set; } = new();
    }

    /*

        wpm: number;
        accuracy: number;
        errorMap: ErrorMap;
        corrections: number;
        wordsCount: number;
        lettersCount: number;
        correctWords: number;
        correctLetters: number;
        incorrectWords: number;
        incorrectLetters: number;

    */
}
