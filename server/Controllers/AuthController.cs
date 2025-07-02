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

namespace server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthController : ControllerBase
	{
		private readonly IUserService _userService;
		private readonly IProfileService _profileService;
		private readonly IConfiguration _configuration;

		public AuthController(
			IConfiguration configuration,
			IUserService userService,
			IProfileService profileService)
		{
			_configuration = configuration;
			_userService = userService;
			_profileService = profileService;
		}

		[HttpPost("register")]
		public async Task<ActionResult> Register([FromBody] RegisterRequestDTO request)
		{
			if (await _userService.UserExists(request.Username, request.EmailAddress))
			{
				return Conflict("User already exists");
			}

			string generatedUserId = ObjectId.GenerateNewId().ToString();

			User user = new()
			{
				UserId = generatedUserId,
				EmailAddress = request.EmailAddress,
				IsAdmin = false,
				AuthProvider = AuthenticationProviders.Local,
				ProfilePictureUrl = string.Empty
			};

			var hashedPassword = new PasswordHasher<User>()
				.HashPassword(user, request.Password);

			user.Username = request.Username;
			user.PasswordHash = hashedPassword;

			await _userService.CreateAsync(user);

			// Create user profile (maintaining 1-1 relationship)
			Profile userProfile = new()
			{
				ProfileId = generatedUserId,
			};

			await _profileService.CreateProfileAsync(userProfile);

			return Ok(new { user, userProfile });
		}

		[HttpPost("login")]
		public async Task<ActionResult<string>> Login([FromBody] LoginRequestDTO request)
		{
			var user = await _userService.GetByEmailAsync(request.EmailAddress);

			if (user is null)
			{
				return Unauthorized("User not found!");
			}

			if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
			{
				return Unauthorized("Incorrect password!");
			}

			string token = CreateToken(user);

			return Ok(new { token });
		}

		[HttpGet("dummy")]
		public async Task Dummy()
		{
			await Task.FromResult(false);
		}

		private string CreateToken(User user)
		{
			var claims = new List<Claim>
			{
				new(ClaimTypes.Name, user.Username)
			};

			var key = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AppSettings:Token")!)
			);

			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

			var tokenDescriptor = new JwtSecurityToken(
				issuer: _configuration.GetValue<string>("AppSettings:Issuer"),
				audience: _configuration.GetValue<string>("AppSettings:Audience"),
				claims: claims,
				expires: DateTime.UtcNow.AddDays(1),
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
		}
	}
}
