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
		[BsonRepresentation(BsonType.String)]
		public RoomState State { get; set; } = RoomState.Waiting;

		[BsonElement("availability")]
		[BsonRepresentation(BsonType.String)]
		public RoomAvailability Availability { get; set; } = RoomAvailability.Available;

		[BsonElement("associated_competitive_drill_ids")]
		public List<string> AssociatedCompetitiveDrillIds { get; set; } = new();

		[BsonElement("active_competitive_drill_id")]
		[BsonRepresentation(BsonType.ObjectId)]
		public string? ActiveCompetitiveDrillId { get; set; }

		[BsonElement("drill_settings")]
		public DrillSettings DrillSettings { get; set; } = null!;

		[BsonElement("room_players")]
		public List<RoomPlayer> RoomPlayers { get; set; } = new();
	}

	public class RoomPlayer
	{
		[BsonElement("user_id")]
		[BsonRepresentation(BsonType.ObjectId)]
		public string UserId { get; set; } = null!;

		[BsonElement("joined_at")]
		public DateTime JoinedAt { get; set; }

		[BsonElement("is_ready")]
		public bool IsReady { get; set; }

		[BsonElement("is_creator")]
		public bool IsCreator { get; set; }
	}
}
