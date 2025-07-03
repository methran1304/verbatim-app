using server.Entities;

namespace server.Services.Interfaces
{
	public interface IUserService
	{
		Task<User?> GetByEmailAsync(string emailId);
		Task<User?> GetByUserId(string userId);
		Task CreateAsync(User user);
		Task<bool> UserExists(string username, string emailId);
		Task RotateRefreshToken(string userId, string refreshToken);
	}
}
