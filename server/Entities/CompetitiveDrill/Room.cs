using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Entities.Enums;
using server.Entities.Models;

namespace server.Entities
{
	public class Room
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string RoomId { get; set; } = null!;

		[BsonElement("created_by")]
		[BsonRepresentation(BsonType.ObjectId)]
		public string CreatedBy { get; set; } = null!;

		[BsonElement("created_at")]
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		[BsonElement("is_active")]
		public bool IsActive { get; set; } = false;

		[BsonElement("room_code")]
		public string RoomCode { get; set; } = null!;

		[BsonElement("state")]
		public RoomState State { get; set; } = RoomState.Waiting;

		[BsonElement("availability")]
		public RoomAvailability Availability { get; set; } = RoomAvailability.Available;

		[BsonElement("associated_competitive_drill_ids")]
		[BsonRepresentation(BsonType.ObjectId)]
		public List<string> AssociatedCompetitiveDrillIds { get; set; } = new();

		[BsonElement("active_competitive_drill_id")]
		[BsonRepresentation(BsonType.ObjectId)]
		public string ActiveCompetitiveDrillId { get; set; } = null!;

		[BsonElement("drill_settings")]
		public DrillSettings DrillSettings { get; set; } = null!;
	}
}
