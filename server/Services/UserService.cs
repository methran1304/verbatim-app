using MongoDB.Driver;
using MongoDB.Driver.Linq;
using server.Data.Mongo;
using server.Entities;
using server.Services.Interfaces;

namespace server.Services
{
	public class UserService(MongoDbContext context) : IUserService
	{
		private readonly IMongoCollection<User> _users = context.Users;

		public async Task CreateAsync(User user) => await _users.InsertOneAsync(user);

		public async Task<User?> GetByEmailAsync(string emailId) =>
			await _users.Find(u => u.EmailAddress == emailId).FirstOrDefaultAsync();

		public async Task<bool> UserExists(string username, string emailId)
		{
			var filter = Builders<User>.Filter.Or(
				Builders<User>.Filter.Eq(u => u.Username, username),
				Builders<User>.Filter.Eq(u => u.EmailAddress, emailId)
			);

			return await context.Users.Find(filter).AnyAsync();
		}
	}
}
