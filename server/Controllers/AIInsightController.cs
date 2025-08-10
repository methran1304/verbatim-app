using System.Net.NetworkInformation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services;
using server.Services.Interfaces;
using server.Utils;

namespace server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AIInsightController : BaseController
    {
        private readonly IDrillService _drillService;
        private readonly IAIInsightService _aiInsightService;
        private readonly IProfileService _profileService;

        public AIInsightController(IDrillService drillService, IAIInsightService aiInsightService, IProfileService profileService)
        {
            _drillService = drillService;
            _aiInsightService = aiInsightService;
            _profileService = profileService;
        }

        [HttpGet("get-ai-insights")]
        public async Task<IActionResult> GetAIInsights()
        {
            var userId = UserIdRequired;

            var (canGenerate, reason) = await _aiInsightService.CanGenerateFeedbackAsync(userId);
            if (!canGenerate)
            {
                return BadRequest(new { 
                    error = reason,
                    canRetry = reason.Contains("Daily limit reached") ? false : true
                });
            }

            var result = await _aiInsightService.GetAIInsightsAsync(userId);

            // Increment the counter after successful generation
            await _aiInsightService.IncrementAiInsightsCounterAsync(userId);

            return Ok(result);
        }

        [HttpGet("get-last-ai-insight")]
        public async Task<IActionResult> GetLastAiInsight()
        {
            var userId = UserIdRequired;
            var lastInsight = await _profileService.GetLastAiInsight(userId);
            return Ok(lastInsight);
        }
    }
} 