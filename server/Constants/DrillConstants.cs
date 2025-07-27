namespace server.Constants
{
    public static class DrillConstants
    {
        // difficulty multipliers
        public const double BeginnerMultiplier = 0.9;
        public const double IntermediateMultiplier = 1.0;
        public const double AdvancedMultiplier = 1.3;

        // type multipliers
        public const double AdaptiveMultiplier = 1.2;
        public const double MemoryModeMultiplier = 1.4;
        public const double DefaultTypeMultiplier = 1.0;

        // competitive mode
        public const double CompetitiveMultiplier = 1.6;

        // points
        public const int MinPoints = 10;
        public const int MaxPoints = 150;

        // date format
        public const string ActivityDateFormat = "yyyy-MM-dd";
    }
}