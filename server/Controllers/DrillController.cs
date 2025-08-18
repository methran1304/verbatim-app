using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services.Interfaces;
using server.Utils;

namespace server.Controllers
{
    [Authorize]
    [Route("/api/[controller]")]
    public class DrillController(
		IConfiguration configuration,
		IUserService userService,
		IProfileService profileService,
		IDrillService drillService) : BaseController
    {
        private readonly IConfiguration _configuration = configuration;
        private readonly IUserService _userService = userService;
        private readonly IProfileService _profileService = profileService;
        private readonly IDrillService _drillService = drillService;

		[HttpPost("submit")]
        public async Task<IActionResult> SubmitDrill([FromBody] DrillSubmissionRequestDTO submission)
        {
            var userId = UserIdRequired;

            // Validate drill submission to prevent AFK/inactive submissions
            var validationResult = ValidateDrillSubmission(submission);
            if (!validationResult.IsValid)
            {
                return BadRequest(new { error = validationResult.ErrorMessage });
            }

            var drill = new Drill
            {
                DrillType = submission.DrillType,
                UserId = userId,
                DrillDifficulty = submission.DrillDifficulty,
                Statistics = submission.DrillStatistic,
                PointsGained = DrillScorer.CalculateUserPoints(
                    submission.DrillType,
                    submission.DrillDifficulty,
                    submission.DrillStatistic.WPM,
                    submission.DrillStatistic.Accuracy
                )
            };

            await _drillService.CreateDrillAsync(drill);

            // Get current profile to calculate differences
            var currentProfile = await _profileService.GetByUserId(userId);
            
            // Update profile
            await _profileService.UpdateProfilePostDrill(userId, drill);
            
            // Get updated profile to calculate differences
            var updatedProfile = await _profileService.GetByUserId(userId);

            var response = new DrillSubmissionResponseDTO
            {
                DrillId = drill.DrillId,
                AvgWPM = new StatDifferenceDouble
                {
                    Current = currentProfile?.AvgWPM ?? 0d,
                    New = updatedProfile!.AvgWPM
                },
                AvgAccuracy = new StatDifferenceDouble
                {
                    Current = currentProfile?.AvgAccuracy ?? 0d,
                    New = updatedProfile!.AvgAccuracy
                },
                AvgCorrections = new StatDifferenceDouble
                {
                    Current = currentProfile?.AvgCorrections ?? 0d,
                    New = updatedProfile!.AvgCorrections
                },
                AvgErrorRate = new StatDifferenceDouble
                {
                    Current = currentProfile?.AvgErrorRate ?? 0d,
                    New = updatedProfile!.AvgErrorRate
                },
                TotalWords = new StatDifference
                {
                    Current = currentProfile?.TotalWords ?? 0,
                    New = updatedProfile!.TotalWords
                },
                TotalLetters = new StatDifference
                {
                    Current = currentProfile?.TotalLetters ?? 0,
                    New = updatedProfile!.TotalLetters
                },
                TotalCorrectWords = new StatDifference
                {
                    Current = currentProfile?.TotalCorrectWords ?? 0,
                    New = updatedProfile!.TotalCorrectWords
                },
                TotalIncorrectWords = new StatDifference
                {
                    Current = currentProfile?.TotalIncorrectWords ?? 0,
                    New = updatedProfile!.TotalIncorrectWords
                },
                TotalCorrectLetters = new StatDifference
                {
                    Current = currentProfile?.TotalCorrectLetters ?? 0,
                    New = updatedProfile!.TotalCorrectLetters
                },
                TotalIncorrectLetters = new StatDifference
                {
                    Current = currentProfile?.TotalIncorrectLetters ?? 0,
                    New = updatedProfile!.TotalIncorrectLetters
                },
                UserPoints = new StatDifference
                {
                    Current = currentProfile?.UserPoints ?? 0,
                    New = updatedProfile!.UserPoints
                },
                MaxWPM = new StatDifferenceDouble
                {
                    Current = currentProfile?.MaxWPM ?? 0d,
                    New = updatedProfile!.MaxWPM
                },
                MaxAccuracy = new StatDifferenceDouble
                {
                    Current = currentProfile?.MaxAccuracy ?? 0d,
                    New = updatedProfile!.MaxAccuracy
                },
                TotalDrillDuration = new StatDifference
                {
                    Current = currentProfile?.TotalDrillDuration ?? 0,
                    New = updatedProfile!.TotalDrillDuration
                }
            };

            return Ok(response);
        }


        private ValidationResult ValidateDrillSubmission(DrillSubmissionRequestDTO submission)
        {
            const int MAX_DRILL_DURATION_SECONDS = 7200; // 2 hours
            const int MAX_REALTIME_DATA_POINTS = 7200; // 2 hours worth of data points
            const double MIN_CHARS_PER_SECOND = 0.1; // Minimum characters per second for non-timed drills

            // Check if drill duration is reasonable
            if (submission.DrillStatistic.Duration > MAX_DRILL_DURATION_SECONDS)
            {
                return new ValidationResult
                {
                    IsValid = false,
                    ErrorMessage = "Drill duration exceeds maximum allowed time of 2 hours."
                };
            }

            // Check if real-time data array is not excessively large
            if (submission.DrillStatistic.RealTimeData?.Count > MAX_REALTIME_DATA_POINTS)
            {
                return new ValidationResult
                {
                    IsValid = false,
                    ErrorMessage = "Real-time data array is too large. Please restart the drill."
                };
            }

            // For non-timed drills, check for suspicious inactivity patterns
            if (submission.DrillType != DrillType.Timed)
            {
                var totalTypedChars = submission.DrillStatistic.CorrectLetters + submission.DrillStatistic.IncorrectLetters;
                var charsPerSecond = submission.DrillStatistic.Duration > 0 
                    ? (double)totalTypedChars / submission.DrillStatistic.Duration 
                    : 0;

                // If user typed less than minimum characters per second on average, it's suspicious
                if (charsPerSecond < MIN_CHARS_PER_SECOND && submission.DrillStatistic.Duration > 60)
                {
                    return new ValidationResult
                    {
                        IsValid = false,
                        ErrorMessage = "Very low typing activity detected. Please restart the drill."
                    };
                }

                // Check for suspicious gaps in real-time data (indicating long periods of inactivity)
                if (submission.DrillStatistic.RealTimeData?.Count > 0)
                {
                    var timePoints = submission.DrillStatistic.RealTimeData.Select(d => d.TimePoint).OrderBy(t => t).ToList();
                    var maxGap = 0;
                    
                    for (int i = 1; i < timePoints.Count; i++)
                    {
                        var gap = timePoints[i] - timePoints[i - 1];
                        if (gap > maxGap) maxGap = gap;
                    }

                    // If there's a gap larger than 10 minutes, it's suspicious
                    if (maxGap > 600)
                    {
                        return new ValidationResult
                        {
                            IsValid = false,
                            ErrorMessage = "Suspicious inactivity periods detected in drill data."
                        };
                    }
                }
            }

            return new ValidationResult { IsValid = true };
        }
    }

    public class ValidationResult
    {
        public bool IsValid { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
    }
}