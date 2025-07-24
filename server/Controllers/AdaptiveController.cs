using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Entities.Enums;
using server.Services.Interfaces;
using server.Utils;

namespace server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AdaptiveController : BaseController
    {
        private readonly IAdaptiveService _adaptiveService;

        public AdaptiveController(IAdaptiveService adaptiveService)
        {
            _adaptiveService = adaptiveService;
        }

        [HttpGet("get-adaptive-drill-words")]
        public async Task<IActionResult> GetAdaptiveDrillWords(DrillDifficulty difficulty, int count)
        {
            var userId = UserIdRequired;
                
            if (!await _adaptiveService.CanGenerateAdaptiveDrillWordsAsync(userId, difficulty))
            {
                return BadRequest("Insufficient data to generate adaptive drill words for this difficulty. Please participate in more drills in this difficulty.");
            }

            var words = await _adaptiveService.GetAdaptiveDrillWordsAsync(userId, difficulty, count);
            return Ok(words);
        }
    }
}