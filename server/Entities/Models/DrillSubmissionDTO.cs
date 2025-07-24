using server.Entities.Enums;

namespace server.Entities.Models
{
    public class DrillSubmissionDTO
    {
        public DrillDifficulty DrillDifficulty { get; set; }
        public DrillType DrillType { get; set; }
        public List<string> SourceText { get; set; } = new();
        public List<string> TypedWords { get; set; } = new();
        public int DrillDuration { get; set; } = 0;
        public DrillStatistic DrillStatistic { get; set; } = new();
    }
}