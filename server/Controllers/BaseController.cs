using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        /// <summary>
        /// Gets the current user ID from claims. Returns null if not authenticated.
        /// </summary>
        public string? UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);

        /// <summary>
        /// Gets the current user ID from claims. Throws InvalidOperationException if not authenticated.
        /// Use this when you're certain the user is authenticated (e.g., in [Authorize] endpoints).
        /// </summary>
        public string UserIdRequired
        {
            get
            {
                return UserId ?? throw new InvalidOperationException("User is not authenticated");
            }
        }
    }
} 