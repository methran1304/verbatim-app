using server.Entities.Enums;

namespace server.Services
{
    public interface ILevelCalculationService
    {
        OverallLevel CalculateCasualLevel(int userPoints);
        CompetitiveRank CalculateCompetitiveRank(int competitivePoints);
        int GetNextCasualLevelThreshold(int currentLevel);
        int GetNextCompetitiveRankThreshold(int currentRank);
        string GetCasualLevelName(OverallLevel level);
        string GetCompetitiveRankName(CompetitiveRank rank);
    }

    public class LevelCalculationService : ILevelCalculationService
    {
        public OverallLevel CalculateCasualLevel(int userPoints)
        {
            return userPoints switch
            {
                < 1000 => OverallLevel.Beginner,
                < 2500 => OverallLevel.Intermediate,
                < 5000 => OverallLevel.Advanced,
                _ => OverallLevel.Expert
            };
        }

        public CompetitiveRank CalculateCompetitiveRank(int competitivePoints)
        {
            return competitivePoints switch
            {
                < 300 => CompetitiveRank.Bronze,
                < 800 => CompetitiveRank.Silver,
                < 1500 => CompetitiveRank.Gold,
                < 2500 => CompetitiveRank.Platinum,
                < 4000 => CompetitiveRank.Diamond,
                < 6000 => CompetitiveRank.Master,
                _ => CompetitiveRank.Grandmaster
            };
        }

        public int GetNextCasualLevelThreshold(int currentLevel)
        {
            return currentLevel switch
            {
                1 => 1000,  // Beginner -> Intermediate
                2 => 2500,  // Intermediate -> Advanced
                3 => 5000,  // Advanced -> Expert
                _ => int.MaxValue // Expert is max level
            };
        }

        public int GetNextCompetitiveRankThreshold(int currentRank)
        {
            return currentRank switch
            {
                1 => 300,   // Bronze -> Silver
                2 => 800,   // Silver -> Gold
                3 => 1500,  // Gold -> Platinum
                4 => 2500,  // Platinum -> Diamond
                5 => 4000,  // Diamond -> Master
                6 => 6000,  // Master -> Grandmaster
                _ => int.MaxValue // Grandmaster is max rank
            };
        }

        public string GetCasualLevelName(OverallLevel level)
        {
            return level switch
            {
                OverallLevel.Beginner => "Beginner",
                OverallLevel.Intermediate => "Intermediate",
                OverallLevel.Advanced => "Advanced",
                OverallLevel.Expert => "Expert",
                _ => "Unknown"
            };
        }

        public string GetCompetitiveRankName(CompetitiveRank rank)
        {
            return rank switch
            {
                CompetitiveRank.Bronze => "Bronze",
                CompetitiveRank.Silver => "Silver",
                CompetitiveRank.Gold => "Gold",
                CompetitiveRank.Platinum => "Platinum",
                CompetitiveRank.Diamond => "Diamond",
                CompetitiveRank.Master => "Master",
                CompetitiveRank.Grandmaster => "Grandmaster",
                _ => "Unknown"
            };
        }
    }
}
