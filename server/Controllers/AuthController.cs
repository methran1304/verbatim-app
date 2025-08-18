using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Entities.Models.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthController : ControllerBase
	{
		private readonly IAuthService _authService;

		public AuthController(IAuthService authService)
		{
			_authService = authService;
		}

		[HttpPost("register")]
		public async Task<ActionResult> Register([FromBody] RegisterRequestDTO request)
		{
			var user = await _authService.RegisterAsync(request);

			if (user is null)
				return BadRequest("User already exists.");

			return Ok(user);
		}

		[HttpPost("login")]
		public async Task<ActionResult<TokenResponseDTO>> Login([FromBody] LoginRequestDTO request)
		{
			var result = await _authService.LoginAsync(request);

			if (result is null)
				return Unauthorized("Invalid username or password.");

			return Ok(result);
		}

		[HttpPost("refresh-token")]
		public async Task<ActionResult<TokenResponseDTO>> RefreshToken([FromBody] RefreshTokenRequestDTO request)
		{
			if (string.IsNullOrEmpty(request.UserId) || string.IsNullOrEmpty(request.RefreshToken))
			{
				return BadRequest("UserId and RefreshToken are required.");
			}

			var result = await _authService.RefreshTokensAsync(request);

			if (result is null || result.AccessToken is null || result.RefreshToken is null)
			{
				return Unauthorized("Invalid refresh token or user id.");
			}

			return Ok(result);
		}

		// TODO
		[HttpPost("forgot-password")]
		public async Task<ActionResult<Object>> ForgotPassword([FromBody] ForgotPasswordRequest request)
		{
			await Task.FromResult(false);
			return Ok();
		}

		[HttpPost("reset-password")]
		public async Task<ActionResult<Object>> ResetPassword([FromBody] ResetPasswordRequest request)
		{
			await Task.FromResult(false);
			return Ok();
		}

		[HttpPost("google-signin")]
		public async Task<ActionResult<TokenResponseDTO>> GoogleSignIn([FromBody] GoogleAuthRequestDTO request)
		{
			var result = await _authService.GoogleSignInAsync(request.IdToken);

			if (result is null)
				return Unauthorized("Invalid Google ID token.");

			return Ok(result);
		}
	}
}
