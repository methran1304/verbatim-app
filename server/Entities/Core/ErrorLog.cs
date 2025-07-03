using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Entities.Core
{
    public class ErrorLog
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public string Path { get; set; } = null!;

        public string Message { get; set; } = null!;

        public string? StackTrace { get; set; }

        public string? UserId { get; set; }
    }
}