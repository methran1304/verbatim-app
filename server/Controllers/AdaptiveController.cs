using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        private readonly ILogger<AdaptiveController> _logger;
        private readonly IFuzzySearchService _fuzzySearchService;

        public AdaptiveController(
            IAdaptiveService adaptiveService,
            ILogger<AdaptiveController> logger,
            IFuzzySearchService fuzzySearchService)
        {
            _adaptiveService = adaptiveService;
            _logger = logger;
            _fuzzySearchService = fuzzySearchService;
        }

        [HttpGet("get-adaptive-drill-words")]
        public async Task<IActionResult> GetAdaptiveDrillWords(DrillDifficulty difficulty, int count)
        {
            var userId = UserIdRequired;

            if (!await _adaptiveService.CanGenerateAdaptiveDrillWordsAsync(userId, difficulty))
            {
                return BadRequest("Insufficient data to generate adaptive drill words. Please complete at least 5 drills in this difficulty within the last 30 days.");
            }

            var errorProneWords = await _adaptiveService.GetErrorProneWordsAsync(userId, difficulty, count);

            // if no error-prone words found, return appropriate message
            if (errorProneWords.Count == 0)
            {
                return BadRequest("No error-prone words found. You may have made no errors in recent drills, or there's insufficient data. Try completing more drills first.");
            }

            // use fuzzy-search to get similar words based on error prone words
            try
            {
                var wordsPerErrorWord = count / 10;
                var fuzzySearchResponse = await _fuzzySearchService.GetSimilarWordsAsync(errorProneWords, difficulty, wordsPerErrorWord);
                return Ok(fuzzySearchResponse);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Failed to call FuzzySearch microservice");
                return BadRequest("Something went wrong! Please try again later.");
            }
        }
    }
}