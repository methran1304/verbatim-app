using System.Net.NetworkInformation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using server.Entities.Enums;
using server.Entities.Models;
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

        [HttpGet("get-error-prone-words")]
        public async Task<IActionResult> GetErrorProneWords(DrillDifficulty difficulty)
        {
            var userId = UserIdRequired;

            if (!await _adaptiveService.CanGenerateAdaptiveDrillWordsAsync(userId, difficulty))
            {
                return Ok(
                    new ErrorProneWordsResponse
                    {
                        Success = false,
                        Message = "Insufficient data to generate adaptive drill words. Please complete at least 5 drills in this difficulty."
                    }
                );
            }

            var errorProneWords = await _adaptiveService.GetErrorProneWordsAsync(userId, difficulty);

            return Ok(
                new ErrorProneWordsResponse
                {
                    Success = true,
                    ErrorProneWords = errorProneWords
                }
            );
        }

        [HttpGet("get-adaptive-drill-words")]
        public async Task<IActionResult> GetAdaptiveDrillWords(DrillDifficulty difficulty, int count)
        {
            var userId = UserIdRequired;

            // Validate the request using the new comprehensive validation method
            var (canGenerate, errorMessage) = await _adaptiveService.ValidateAdaptiveDrillGenerationAsync(userId, difficulty, count);
            
            if (!canGenerate)
            {
                return Ok(
                    new AdaptiveDrillResponseDTO
                    {
                        Success = false,
                        Message = errorMessage ?? "Unable to generate adaptive drill words."
                    });
            }

            var errorProneWords = await _adaptiveService.GetErrorProneWordsAsync(userId, difficulty);

            // use fuzzy-search to get similar words based on error prone words
            try
            {
                int targetWordsPerError = (int) Math.Ceiling(count / (double)errorProneWords.Count);
                      
                var fuzzySearchResponse = await _fuzzySearchService.GetSimilarWordsAsync(errorProneWords, difficulty, targetWordsPerError, count);

                int totalSimilarWords = fuzzySearchResponse.SimilarWords.Sum(kvp => kvp.Value.Count);

                if (totalSimilarWords < count)
                {
                    return Ok(
                        new AdaptiveDrillResponseDTO
                        {
                            Success = false,
                            Message = "You may have made no errors in recent drills, or there's insufficient data. Try completing more drills in this difficulty."
                        });
                }
                
                return Ok(
                    new AdaptiveDrillResponseDTO
                    {
                        Success = true,
                        FuzzySearchResponse = fuzzySearchResponse
                    });
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Failed to call FuzzySearch microservice");
                return Ok(
                    new AdaptiveDrillResponseDTO
                    {
                        Success = false,
                        Message = "Something went wrong! Please try again later."
                    });
            }
        }
    }
}