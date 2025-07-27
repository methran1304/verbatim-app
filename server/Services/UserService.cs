using MongoDB.Driver;
using MongoDB.Driver.Linq;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Enums;
using server.Services.Interfaces;

namespace server.Services
{
	public class UserService(MongoDbContext context) : IUserService
	{
		private readonly IMongoCollection<User> _users = context.Users;

		public async Task CreateAsync(User user) => await _users.InsertOneAsync(user);

		public async Task<User?> GetByEmailAsync(string emailId) =>
			await _users.Find(u => u.EmailAddress == emailId).FirstOrDefaultAsync();

		public async Task<User?> GetByUserId(string userId) =>
			await _users.Find(u => u.UserId == userId).FirstOrDefaultAsync();

		public async Task RotateRefreshToken(string userId, string refreshToken)
		{
			var filter = GetUserIdFilter(userId);

			var updateDefinition = Builders<User>
				.Update
				.Set(u => u.RefreshToken, refreshToken)
				.Set(u => u.RefreshTokenExpiryTime, DateTime.UtcNow.AddDays(7));

			await _users.UpdateOneAsync(filter, updateDefinition);
		}

		public async Task<bool> UserExists(string username, string emailId)
		{
			var filter = Builders<User>.Filter.Or(
				Builders<User>.Filter.Eq(u => u.Username, username),
				Builders<User>.Filter.Eq(u => u.EmailAddress, emailId)
			);

			return await context.Users.Find(filter).AnyAsync();
		}

		private static FilterDefinition<User> GetUserIdFilter(string userIdOrEmailAddress)
		{
			return Builders<User>
				.Filter
				.Eq(u => u.UserId, userIdOrEmailAddress);
		}

		public async Task<User?> GetByUsernameAsync(string username)
		{
			return await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
		}
	}
}
