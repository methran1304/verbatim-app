namespace server.Constants
{
    public static class DrillConstants
    {
        // Difficulty multipliers
        public const double BeginnerMultiplier = 0.9;
        public const double IntermediateMultiplier = 1.0;
        public const double AdvancedMultiplier = 1.3;

        // Type multipliers
        public const double AdaptiveMultiplier = 1.2;
        public const double MemoryModeMultiplier = 1.4;
        public const double DefaultTypeMultiplier = 1.0;

        // Points
        public const int MinPoints = 10;
        public const int MaxPoints = 150;

        // Date format
        public const string ActivityDateFormat = "yyyy-MM-dd";
    }
}