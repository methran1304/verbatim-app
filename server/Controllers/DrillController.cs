using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using server.Entities;
using server.Entities.Core;
using server.Entities.Models;
using server.Services.Interfaces;
using server.Utils;

namespace server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/[controller]")]
    public class DrillController(
		IConfiguration configuration,
		IUserService userService,
		IProfileService profileService,
		IDrillService drillService,
		IDrillInputService drillInputService,
		IDrillSourceTextService drillSourceTextService) : ControllerBase
    {
        private readonly IConfiguration _configuration = configuration;
        private readonly IUserService _userService = userService;
        private readonly IProfileService _profileService = profileService;
        private readonly IDrillService _drillService = drillService;
        private readonly IDrillInputService _drillInputService = drillInputService;
        private readonly IDrillSourceTextService _drillSourceTextService = drillSourceTextService;

		[HttpPost("submit")]
        public async Task<IActionResult> SubmitDrill([FromBody] DrillSubmissionDTO submission)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
                return Unauthorized();

            var drillInput = GetDrillInputEntity(submission.TypedWords);
            var drillSourceText = GetDrillSourceEntity(submission.SourceText);

            var saveTasks = new List<Task>
            {
                _drillInputService.SaveInputAsync(drillInput),
                _drillSourceTextService.SaveSourceTextAsync(drillSourceText)
            };

            await Task.WhenAll(saveTasks);

            var drill = new Drill
            {
                DrillType = submission.DrillType,
                UserId = userId,
                DrillDuration = submission.DrillDuration,
                DrillDifficulty = submission.DrillDifficulty,
                DrillInputId = drillInput.DrillInputId,
                SourceTextId = drillSourceText.DrillSourceId,
                WPM = submission.WPM,
                Accuracy = submission.Accuracy,
                WordErrorMap = submission.WordErrorMap,
                CharErrorMap = submission.CharErrorMap,
                PointsGained = DrillScorer.CalculateCasualPoints(
                    submission.DrillType,
                    submission.DrillDifficulty,
                    submission.WPM,
                    submission.Accuracy
                )
            };

            await _drillService.CreateDrillAsync(drill);

            // Update profile
            await _profileService.UpdateProfilePostDrill(userId, drill);

            return Ok(new { drillId = drill.DrillId });
        }

        private DrillInput GetDrillInputEntity(List<string> drillInput)
        {
            var drillInputId = ObjectId.GenerateNewId().ToString();

            return new DrillInput
            {
                DrillInputId = drillInputId,
                InputText = drillInput
            };
        }

        private DrillSourceText GetDrillSourceEntity(List<string> drillSource)
        {
            var drillSourceId = ObjectId.GenerateNewId().ToString();

            return new DrillSourceText
            {
                DrillSourceId = drillSourceId,
                SourceText = drillSource
            };
        }
    }
}