using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;

namespace server.Services.Interfaces
{
	public interface IProfileService
	{
		Task CreateProfileAsync(Profile profile);
		Task<Profile?> GetByUserId(string userId);
		public Task<bool> UpdateProfilePostDrill(string userId, Drill completedDrill);
	}
}
