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

        [HttpGet("activity")]
        public async Task<IActionResult> GetActivity()
        {
            var userId = UserIdRequired;
            var activityData = await _profileService.GetActivity(userId);
            return Ok(activityData);
        }

        [HttpGet("metrics-over-time")]
        public async Task<IActionResult> GetMetricOverTime([FromQuery] string timePeriod = "week")
        {
            var userId = UserIdRequired;
            var metricsData = await _profileService.GetMetricOverTime(userId, timePeriod);
            return Ok(metricsData);
        }

        [HttpGet("drill-distribution")]
        public async Task<IActionResult> GetDrillDistribution([FromQuery] string timePeriod = "week")
        {
            var userId = UserIdRequired;
            var distributionData = await _profileService.GetDrillDistribution(userId, timePeriod);
            return Ok(distributionData);
        }
        
        [HttpGet("stats")]
        public async Task<IActionResult> GetProfileStats()
        {
            var userId = UserIdRequired;
            var profileStats = await _profileService.GetProfileStats(userId);
            return Ok(profileStats);
        }
        
        [HttpGet("ai-insight")]
        public async Task<IActionResult> GetAIInsight()
        {
            var userId = UserIdRequired;
            var aiInsight = await _profileService.GetAIInsight(userId);
            return Ok(aiInsight);
        }
        
        [HttpPost("populate-test-data")]
        public async Task<IActionResult> PopulateTestData()
        {
            var success = await _profileService.PopulateDrillsWithTestData();
            if (success)
            {
                return Ok(new { message = "Test data populated successfully" });
            }
            return BadRequest(new { message = "Failed to populate test data" });
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
