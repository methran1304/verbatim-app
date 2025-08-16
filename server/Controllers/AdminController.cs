using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;

namespace server.Controllers
{
	[ApiController]
	[Route("api/admin")]
	public class AdminController : ControllerBase
	{
		private readonly IProfileService _profileService;
		
		public AdminController(IProfileService profileService)
		{
			_profileService = profileService;
		}
		
		[HttpPost("clear-all-book-progress")]
		public async Task<IActionResult> ClearAllBookProgress()
		{
			try
			{
				var result = await _profileService.ClearAllBookProgress();
				
				if (result)
				{
					return Ok(new { message = "All book progress cleared successfully", success = true });
				}
				else
				{
					return BadRequest(new { message = "Failed to clear book progress", success = false });
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Error clearing book progress: {ex.Message}", success = false });
			}
		}
		
		[HttpPost("clear-all-ai-feedback")]
		public async Task<IActionResult> ClearAllAiFeedback()
		{
			try
			{
				var result = await _profileService.ClearAllAiFeedback();
				
				if (result)
				{
					return Ok(new { message = "All AI feedback cleared successfully", success = true });
				}
				else
				{
					return BadRequest(new { message = "Failed to clear AI feedback", success = false });
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Error clearing AI feedback: {ex.Message}", success = false });
			}
		}
	}
}
