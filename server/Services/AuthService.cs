using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly IProfileService _profileService;
        private readonly IConfiguration _configuration;

        public AuthService(
            IConfiguration configuration,
            IUserService userService,
            IProfileService profileService)
        {
            _configuration = configuration;
            _userService = userService;
            _profileService = profileService;
        }
        public async Task<TokenResponseDTO?> LoginAsync(LoginRequestDTO request)
        {
            var user = await _userService.GetByEmailAsync(request.EmailAddressOrUsername);

            user ??= await _userService.GetByUsernameAsync(request.EmailAddressOrUsername);

            if (user is null)
            {
                return null;
            }

            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            {
                return null;
            }

            var response = CreateTokenResponse(user);
            await _userService.RotateRefreshToken(user.UserId, response.RefreshToken);
            return response;
        }

        public async Task<User?> RegisterAsync(RegisterRequestDTO request)
        {
            if (await _userService.UserExists(request.Username, request.EmailAddress))
			{
                return null;
			}

            string generatedUserId = ObjectId.GenerateNewId().ToString();

            User user = new()
            {
                UserId = generatedUserId,
                EmailAddress = request.EmailAddress,
                IsAdmin = false,
                AuthProvider = AuthenticationProviders.Local,
                ProfilePictureUrl = string.Empty,
                RefreshToken = GenerateRefreshToken(),
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
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

            return user;
        }

        public async Task<TokenResponseDTO?> RefreshTokensAsync(RefreshTokenRequestDTO request)
        {
            var user = await ValidateRefreshTokenAsync(request.UserId, request.RefreshToken);

            if (user is null)
                return null;

            var response = CreateTokenResponse(user);
            await _userService.RotateRefreshToken(user.UserId, response.RefreshToken);
            return response;
        }

        private TokenResponseDTO CreateTokenResponse(User user)
        {
            return new TokenResponseDTO
            {
                AccessToken = CreateToken(user),
                RefreshToken = GenerateRefreshToken()
            };
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<User?> ValidateRefreshTokenAsync(string userId, string refreshToken)
        {
            var user = await _userService.GetByUserId(userId);

            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }

            return user;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, user.Username),
                new(ClaimTypes.NameIdentifier, user.UserId)
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

        public async Task<TokenResponseDTO?> AuthenticateWithGoogleAsync(string idToken)
        {
            try
            {
                // TODO: Implement Google ID token verification
                // For now, this is a placeholder implementation
                // You'll need to:
                // 1. Verify the Google ID token with Google's servers
                // 2. Extract user information from the token
                // 3. Create or update user in your database
                // 4. Return JWT tokens

                // Placeholder - replace with actual Google token verification
                throw new NotImplementedException("Google authentication not yet implemented. Need to verify ID token with Google and handle user creation/authentication.");
            }
            catch (Exception ex)
            {
                // Log the exception here
                throw;
            }
        }
    }
}