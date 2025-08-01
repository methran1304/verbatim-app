namespace server.Entities.Models
{
    public class DrillSummary
    {
        public string CompetitiveDrillId { get; set; } = string.Empty;
        public string RoomId { get; set; } = string.Empty;
        public string WinnerId { get; set; } = string.Empty;
        public List<PlayerResult> PlayerResults { get; set; } = new();
        public DateTime StartedAt { get; set; }
        public DateTime EndedAt { get; set; }
        public int TotalPlayers { get; set; }
        public DrillSettings DrillSettings { get; set; } = new();
    }

    public class PlayerResult
    {
        public string UserId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public double WPM { get; set; }
        public double Accuracy { get; set; }
        public int Position { get; set; }
        public int PointsChange { get; set; }
        public DateTime FinishedAt { get; set; }
        public bool IsWinner { get; set; }
    }
} 