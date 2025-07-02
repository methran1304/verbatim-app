using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Entities.Enums;

namespace server.Entities
{
	public class DrillInput
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string DrillInputId { get; set; } = null!;

		[BsonElement("input_text")]
		public List<string> InputText { get; set; } = null!;
	}
}
