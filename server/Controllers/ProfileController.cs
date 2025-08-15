using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Entities;
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProfileController : BaseController
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("book-progress")]
        public async Task<IActionResult> GetAllBookProgress()
        {
            var userId = UserIdRequired;
            var allProgress = await _profileService.GetAllBookProgress(userId);
            return Ok(allProgress);
        }

        [HttpPost("start-book")]
        public async Task<IActionResult> StartBook([FromBody] StartBookRequest request)
        {
            var userId = UserIdRequired;
            var success = await _profileService.StartBookProgress(userId, request.BookId, request.TotalWords);
            
            if (!success)
            {
                return BadRequest(new { message = "Failed to start book progress" });
            }

            return Ok(new { message = "Book progress started successfully" });
        }

        [HttpPost("update-book-progress")]
        public async Task<IActionResult> UpdateBookProgress([FromBody] UpdateBookProgressRequest request)
        {
            var userId = UserIdRequired;
            var success = await _profileService.UpdateBookProgress(userId, request.BookId, request.CompletedWords, request.IsCompleted);
            
            if (!success)
            {
                return BadRequest(new { message = "Failed to update book progress" });
            }

            return Ok(new { message = "Book progress updated successfully" });
        }

        [HttpPost("reset-book")]
        public async Task<IActionResult> ResetBook([FromBody] ResetBookRequest request)
        {
            var userId = UserIdRequired;
            var success = await _profileService.ResetBookProgress(userId, request.BookId);
            
            if (!success)
            {
                return BadRequest(new { message = "Failed to reset book progress" });
            }

            return Ok(new { message = "Book progress reset successfully" });
        }
    }

    public class StartBookRequest
    {
        public string BookId { get; set; } = string.Empty;
        public int TotalWords { get; set; }
    }

    public class UpdateBookProgressRequest
    {
        public string BookId { get; set; } = string.Empty;
        public int CompletedWords { get; set; }
        public bool IsCompleted { get; set; }
    }

    public class ResetBookRequest
    {
        public string BookId { get; set; } = string.Empty;
    }
}
