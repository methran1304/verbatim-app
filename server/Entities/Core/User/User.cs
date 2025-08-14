using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Entities.Enums;

namespace server.Entities
{
	public class User
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string UserId { get; set; } = null!;

		[BsonElement("created_at")]
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		[BsonElement("is_admin")]
		public bool IsAdmin { get; set; } = false;

		[BsonElement("password_hash")]
		public string PasswordHash { get; set; } = null!;

		[BsonElement("username")]
		public string Username { get; set; } = null!;

		[BsonElement("auth_provider")]
		[BsonRepresentation(BsonType.String)]
		public AuthenticationProviders AuthProvider { get; set; }

		[BsonElement("profile_picture_url")]
		public string? ProfilePictureUrl { get; set; }

		[BsonElement("email_address")]
		public string EmailAddress { get; set; } = null!;

		[BsonElement("refresh_token")]
		public string? RefreshToken { get; set; }

		[BsonElement("refresh_token_expiry_time")]
		public DateTime? RefreshTokenExpiryTime { get; set; }

		[BsonElement("max_ai_insights_per_day")]
		public int MaxAiInsightsPerDay { get; set; } = 3;
	}
}
