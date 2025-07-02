using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Entities
{
	public class Room
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string RoomId { get; set; } = null!;

		[BsonElement("associated_drill_ids")]
		[BsonRepresentation(BsonType.ObjectId)]
		public List<string> AssociatedDrillIds { get; set; } = new();

		[BsonElement("created_by")]
		[BsonRepresentation(BsonType.ObjectId)]
		public string CreatedBy { get; set; } = null!;

		[BsonElement("created_at")]
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		[BsonElement("expires_at")]
		public DateTime ExpiresAt { get; set; }

		[BsonElement("is_expired")]
		public bool IsExpired { get; set; } = false;

		[BsonElement("room_code")]
		public string RoomCode { get; set; } = null!;
	}
}
