using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Entities.Enums;
using server.Entities.Models;

namespace server.Entities
{
	public class Profile
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string ProfileId { get; set; } = null!; // should match userid

		[BsonElement("max_wpm")]
		public double MaxWPM { get; set; } = 0;

		[BsonElement("max_accuracy")]
		public double MaxAccuracy { get; set; } = 0;

		[BsonElement("avg_wpm")]
		public double AvgWPM { get; set; } = 0;

		[BsonElement("avg_accuracy")]
		public double AvgAccuracy { get; set; } = 0;

		[BsonElement("avg_corrections")]
		public double AvgCorrections { get; set; } = 0;

		[BsonElement("avg_error_rate")]
		public double AvgErrorRate { get; set; } = 0;

		        // date => list of drill ids
		[BsonElement("activity")]
		public Dictionary<string, List<string>> Activity { get; set; } = new();

		[BsonElement("user_points")]
		public int UserPoints { get; set; } = 0;

		[BsonElement("competitive_points")]
		public int CompetitivePoints { get; set; } = 0;

		[BsonElement("overall_level")]
		[BsonRepresentation(BsonType.Int32)]
		        public OverallLevel OverallLevel { get; set; } = OverallLevel.Beginner;

		[BsonElement("competitive_rank")]
		[BsonRepresentation(BsonType.Int32)]
		public CompetitiveRank CompetitiveRank { get; set; } = CompetitiveRank.Bronze;

		// competitive stats

		[BsonElement("competitive_drills")]
		public int CompetitiveDrills { get; set; } = 0;

		[BsonElement("wins")]
		public int Wins { get; set; } = 0;

		[BsonElement("losses")]
		public int Losses { get; set; } = 0;

		[BsonElement("drills_participated")]
		[BsonRepresentation(BsonType.String)]
		public Dictionary<DrillType, int> DrillsParticipated { get; set; } = new();

		[BsonElement("total_drills_participated")]
		public int TotalDrillsParticipated { get; set; } = 0;

		[BsonElement("total_words")]
		public int TotalWords { get; set; } = 0;

		[BsonElement("total_correct_words")]
		public int TotalCorrectWords { get; set; } = 0;

		[BsonElement("total_incorrect_words")]
		public int TotalIncorrectWords { get; set; } = 0;

		
		[BsonElement("total_letters")]
		public int TotalLetters { get; set; } = 0;

		[BsonElement("total_correct_letters")]
		public int TotalCorrectLetters { get; set; } = 0;
		
		[BsonElement("total_incorrect_letters")]
		public int TotalIncorrectLetters { get; set; } = 0;

		[BsonElement("total_drill_duration")]
		public int TotalDrillDuration { get; set; } = 0; // in seconds

		[BsonElement("ai_insights")]
		public AiInsight AiInsightDetails { get; set; } = null!;

		[BsonElement("book_progress")]
		public List<BookProgress> BookProgress { get; set; } = new();
	}

	public class AiInsight
	{
		[BsonElement("last_generated_at")]
		public DateTime LastGeneratedAt { get; set; } = DateTime.UtcNow;

		[BsonElement("last_ai_insight")]
		public AIFeedbackDTO Insight { get; set; } = new();
		
		[BsonElement("ai_insights_generated_today")]
		public int AiInsightsGeneratedToday { get; set; } = 0;
	}

	public class BookProgress
	{
		[BsonElement("book_id")]
		[BsonRepresentation(BsonType.ObjectId)]
		public string BookId { get; set; } = null!;

		[BsonElement("total_words")]
		public int TotalWords { get; set; } = 0;

		[BsonElement("completed_words")]
		public int CompletedWords { get; set; } = 0;

		[BsonElement("is_completed")]
		public bool IsCompleted { get; set; } = false;
	}
}
