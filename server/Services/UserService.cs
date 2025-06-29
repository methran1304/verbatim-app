using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Models;
using server.Services.Interfaces;

namespace server.Services
{
  public class UserService(MongoDbContext context) : IUserService
  {
    private readonly IMongoCollection<User> _users = context.Users;

    public async Task CreateAsync(User user) => await _users.InsertOneAsync(user);

    public async Task<User?> GetByEmailAsync(string emailId) =>
        await _users.Find(u => u.EmailAddress == emailId).FirstOrDefaultAsync();
  }
}