using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Entities.Enums;
using server.Services;
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProfileController : BaseController
    {
        private readonly IProfileService _profileService;
        private readonly ILevelCalculationService _levelCalculationService;

        public ProfileController(IProfileService profileService, ILevelCalculationService levelCalculationService)
        {
            _profileService = profileService;
            _levelCalculationService = levelCalculationService;
        }

        [HttpGet("level-info")]
        public async Task<IActionResult> GetLevelInfo()
        {
            try
            {
                var userId = UserIdRequired;
                var profile = await _profileService.GetByUserId(userId);

                if (profile == null)
                {
                    return NotFound(new { error = "Profile not found" });
                }

                var overallLevelName = _levelCalculationService.GetCasualLevelName(profile.OverallLevel);
                var competitiveRankName = _levelCalculationService.GetCompetitiveRankName(profile.CompetitiveRank);
                var nextOverallLevelThreshold = _levelCalculationService.GetNextCasualLevelThreshold((int)profile.OverallLevel);
                var nextCompetitiveRankThreshold = _levelCalculationService.GetNextCompetitiveRankThreshold((int)profile.CompetitiveRank);

                var response = new
                {
                    overallLevel = new
                    {
                        name = overallLevelName,
                        level = (int)profile.OverallLevel,
                        currentPoints = profile.UserPoints,
                        nextLevelThreshold = nextOverallLevelThreshold,
                        progress = nextOverallLevelThreshold != int.MaxValue 
                            ? (double)(profile.UserPoints - GetCurrentLevelThreshold((int)profile.OverallLevel)) / (nextOverallLevelThreshold - GetCurrentLevelThreshold((int)profile.OverallLevel))
                            : 1.0
                    },
                    competitiveRank = new
                    {
                        name = competitiveRankName,
                        rank = (int)profile.CompetitiveRank,
                        currentPoints = profile.CompetitivePoints,
                        nextRankThreshold = nextCompetitiveRankThreshold,
                        progress = nextCompetitiveRankThreshold != int.MaxValue
                            ? (double)(profile.CompetitivePoints - GetCurrentRankThreshold((int)profile.CompetitiveRank)) / (nextCompetitiveRankThreshold - GetCurrentRankThreshold((int)profile.CompetitiveRank))
                            : 1.0
                    }
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error", message = ex.Message });
            }
        }

        private int GetCurrentLevelThreshold(int level)
        {
            return level switch
            {
                1 => 0,      // Novice
                2 => 1000,   // Apprentice
                3 => 2500,   // Adept
                4 => 5000,   // Expert
                _ => 0
            };
        }

        private int GetCurrentRankThreshold(int rank)
        {
            return rank switch
            {
                1 => 0,      // Bronze
                2 => 100,    // Silver
                3 => 300,    // Gold
                4 => 600,    // Platinum
                5 => 1000,   // Diamond
                6 => 2000,   // Master
                7 => 4000,   // Grandmaster
                _ => 0
            };
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

        [HttpGet("leaderboard/casual")]
        public async Task<IActionResult> GetCasualLeaderboard([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            try
            {
                var leaderboard = await _profileService.GetCasualLeaderboard(page, pageSize);
                return Ok(leaderboard);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to retrieve casual leaderboard", details = ex.Message });
            }
        }

        [HttpGet("leaderboard/competitive")]
        public async Task<IActionResult> GetCompetitiveLeaderboard([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            try
            {
                var leaderboard = await _profileService.GetCompetitiveLeaderboard(page, pageSize);
                return Ok(leaderboard);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to retrieve competitive leaderboard", details = ex.Message });
            }
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
