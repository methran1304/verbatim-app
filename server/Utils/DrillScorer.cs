using server.Entities.Enums;
using server.Constants;

namespace server.Utils
{
    public static class DrillScorer
    {
        public static int CalculateUserPoints(DrillType type, DrillDifficulty difficulty, double WPM, double Accuracy)
        {
            var difficultyMultiplier = difficulty switch
            {
                DrillDifficulty.Beginner => DrillConstants.BeginnerMultiplier,
                DrillDifficulty.Intermediate => DrillConstants.IntermediateMultiplier,
                DrillDifficulty.Advanced => DrillConstants.AdvancedMultiplier,
                _ => 1.0
            };

            var typeMultiplier = type switch
            {
                DrillType.Adaptive => DrillConstants.AdaptiveMultiplier,
                DrillType.Competitive => DrillConstants.CompetitiveMultiplier,
                _ => DrillConstants.DefaultTypeMultiplier
            };


            var points = WPM * (Accuracy / 100.0) * difficultyMultiplier * typeMultiplier;
            return (int)Math.Clamp(points, DrillConstants.MinPoints, DrillConstants.MaxPoints);
        }
    }
}