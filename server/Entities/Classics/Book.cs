using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Entities
{
	public class Book
	{
		[BsonElement("_id")]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; } = null!;

		[BsonElement("title")]
		public string Title { get; set; } = null!;

		[BsonElement("author")]
		public string Author { get; set; } = null!;

		[BsonElement("genre")]
		public string Genre { get; set; } = null!;

		[BsonElement("description")]
		public string Description { get; set; } = null!;

		[BsonElement("cover_image")]
		public string CoverImage { get; set; } = null!;

		[BsonElement("total_word_count")]
		public int TotalWordCount { get; set; }

		[BsonElement("content")]
		public string Content { get; set; } = null!;

		[BsonElement("published_year")]
		public int? PublishedYear { get; set; }
	}
}