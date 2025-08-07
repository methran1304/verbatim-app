using MongoDB.Driver;
using server.Entities;
using server.Entities.Enums;
using server.Services.Interfaces;
using server.Data.Mongo;

namespace server.Services
{
    public class UserRoomSessionService : IUserRoomSessionService
    {
        private readonly IMongoCollection<UserRoomSession> _sessions;

        public UserRoomSessionService(MongoDbContext mongoDbContext)
        {
            _sessions = mongoDbContext.UserRoomSessions;
        }

        public async Task<UserRoomSession> CreateSessionAsync(string userId, string roomCode, UserRole role)
        {
            // clear any existing active session for this user
            await ClearSessionAsync(userId);

            var session = new UserRoomSession
            {
                UserId = userId,
                RoomCode = roomCode,
                Role = role,
                JoinedAt = DateTime.UtcNow,
                LastActivityAt = DateTime.UtcNow,
                IsActive = true
            };

            await _sessions.InsertOneAsync(session);
            Console.WriteLine($"Created session for user {userId} in room {roomCode} with role {role}");
            return session;
        }

        public async Task<UserRoomSession?> GetActiveSessionAsync(string userId)
        {
            var filter = Builders<UserRoomSession>.Filter.And(
                Builders<UserRoomSession>.Filter.Eq(s => s.UserId, userId),
                Builders<UserRoomSession>.Filter.Eq(s => s.IsActive, true)
            );

            return await _sessions.Find(filter).FirstOrDefaultAsync();
        }

        public async Task UpdateActivityAsync(string userId)
        {
            var filter = Builders<UserRoomSession>.Filter.And(
                Builders<UserRoomSession>.Filter.Eq(s => s.UserId, userId),
                Builders<UserRoomSession>.Filter.Eq(s => s.IsActive, true)
            );

            var update = Builders<UserRoomSession>.Update.Set(s => s.LastActivityAt, DateTime.UtcNow);

            await _sessions.UpdateOneAsync(filter, update);
        }

        public async Task ClearSessionAsync(string userId)
        {
            var filter = Builders<UserRoomSession>.Filter.And(
                Builders<UserRoomSession>.Filter.Eq(s => s.UserId, userId),
                Builders<UserRoomSession>.Filter.Eq(s => s.IsActive, true)
            );

            var update = Builders<UserRoomSession>.Update.Set(s => s.IsActive, false);

            await _sessions.UpdateOneAsync(filter, update);
            Console.WriteLine($"Cleared session for user {userId}");
        }

        public async Task<bool> ValidateSessionAsync(string userId, string roomCode)
        {
            var session = await GetActiveSessionAsync(userId);
            if (session == null || session.RoomCode != roomCode)
                return false;

            // check if session is not too old 
            var timeSinceLastActivity = DateTime.UtcNow - session.LastActivityAt;
            if (timeSinceLastActivity.TotalMinutes > 30)
            {
                await ClearSessionAsync(userId);
                return false;
            }

            return true;
        }

        public async Task<List<UserRoomSession>> GetSessionsByRoomCodeAsync(string roomCode)
        {
            var filter = Builders<UserRoomSession>.Filter.And(
                Builders<UserRoomSession>.Filter.Eq(s => s.RoomCode, roomCode),
                Builders<UserRoomSession>.Filter.Eq(s => s.IsActive, true)
            );

            return await _sessions.Find(filter).ToListAsync();
        }

        public async Task ClearAllSessionsForRoomAsync(string roomCode)
        {
            var filter = Builders<UserRoomSession>.Filter.And(
                Builders<UserRoomSession>.Filter.Eq(s => s.RoomCode, roomCode),
                Builders<UserRoomSession>.Filter.Eq(s => s.IsActive, true)
            );

            var update = Builders<UserRoomSession>.Update.Set(s => s.IsActive, false);

            var result = await _sessions.UpdateManyAsync(filter, update);
            Console.WriteLine($"Cleared {result.ModifiedCount} sessions for room {roomCode}");
        }
    }
}
