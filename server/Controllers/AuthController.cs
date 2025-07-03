using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Entities;
using server.Entities.Models;
using server.Entities.Enums;
using server.Services.Interfaces;
using System.Threading.Tasks;
using MongoDB.Bson;
using System.Security.Cryptography;
using MongoDB.Driver;

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
		public async Task<ActionResult<TokenResponseDTO>> RefreshToken(RefreshTokenRequestDTO request)
		{
			var result = await _authService.RefreshTokensAsync(request);

			if (result is null || result.AccessToken is null || result.RefreshToken is null)
			{
				return Unauthorized("Invalid refresh token or user id.");
			}

			return Ok(result);
		}

		
	}
}
