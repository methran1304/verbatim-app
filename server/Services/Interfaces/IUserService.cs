using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface IUserService
    {
        Task<User?> GetByEmailAsync(string emailId);
        Task CreateAsync(User user);
    }
}