using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Entities.Models
{
    public class RefreshTokenRequestDTO
    {
        public required string UserId { get; set; }
        public required string RefreshToken { get; set; }
    }
}