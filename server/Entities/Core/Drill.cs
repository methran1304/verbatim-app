using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Entities.Enums;

namespace server.Entities
{
	public class Drill
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string DrillId { get; set; } = null!;

		[BsonElement("created_at")]
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		[BsonElement("drill_type")]
		[BsonRepresentation(BsonType.String)]
		public DrillType DrillType { get; set; }

		[BsonElement("user_id")]
		public string UserId { get; set; } = null!;

		[BsonElement("points_gained")] // only applicable for non-competitive modes
		public int PointsGained { get; set; } = 0;

		[BsonElement("drill_duration")] // only for timed drills
		public int DrillDuration { get; set; } = 0;

		[BsonElement("drill_difficulty")] // only for non-competitive drill; null otherwise
		[BsonRepresentation(BsonType.String)]
		public DrillDifficulty? DrillDifficulty { get; set; }

		[BsonElement("source_text_id")]
		public string SourceTextId { get; set; } = null!;

		[BsonElement("drill_input_id")]
		public string DrillInputId { get; set; } = null!;

		[BsonElement("wpm")]
		public double WPM { get; set; } = 0;

		[BsonElement("accuracy")]
		public double Accuracy { get; set; } = 0;

		[BsonElement("word_error_map")]
		public Dictionary<string, int>? WordErrorMap { get; set; } = null;

		[BsonElement("char_error_map")]
		public Dictionary<string, int>? CharErrorMap { get; set; } = null;
	}
}
