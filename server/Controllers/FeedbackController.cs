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
    public class FeedbackController : BaseController
    {
        private readonly IDrillService _drillService;
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IDrillService drillService, IFeedbackService feedbackService)
        {
            _drillService = drillService;
            _feedbackService = feedbackService;
        }

        [HttpGet("get-ai-insights")]
        public async Task<IActionResult> GetAIInsights()
        {
            var userId = UserIdRequired;

            var canGenerateFeedback = await _feedbackService.CanGenerateFeedback(userId);
            if (!canGenerateFeedback)
            {
                return BadRequest("Not enough data to generate feedback");
            }

            var result = await _feedbackService.GetAIInsightsAsync(userId);

            return Ok(result);
        }
    }
}