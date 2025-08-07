using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Entities.Enums;

namespace server.Entities
{
    public class UserRoomSession
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;

        [BsonElement("user_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = null!;

        [BsonElement("room_code")]
        public string RoomCode { get; set; } = null!;

        [BsonElement("joined_at")]
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("last_activity_at")]
        public DateTime LastActivityAt { get; set; } = DateTime.UtcNow;

        [BsonElement("is_active")]
        public bool IsActive { get; set; } = true;

        [BsonElement("role")]
        [BsonRepresentation(BsonType.String)]
        public UserRole Role { get; set; } = UserRole.Member;
    }
}
