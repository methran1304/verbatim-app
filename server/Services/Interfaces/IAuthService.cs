using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;
using server.Entities.Models;
using server.Entities.Models.DTOs;

namespace server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(RegisterRequestDTO request);
        Task<TokenResponseDTO?> LoginAsync(LoginRequestDTO request);
        Task<TokenResponseDTO?> RefreshTokensAsync(RefreshTokenRequestDTO request);
        Task<TokenResponseDTO?> GoogleSignInAsync(string idToken);
        Task<bool> ForgotPasswordAsync(string emailAddress);
        Task<bool> ResetPasswordAsync(string token, string newPassword);
    }
}