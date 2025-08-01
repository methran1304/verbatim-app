using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;
using server.Entities.Enums;

namespace server.Services.Interfaces
{
	public interface IDrillService
	{
		Task CreateDrillAsync(Drill drill);
		Task<List<Drill>> GetRecentDrillsAsync(string userId, int count);
		Task<List<Drill>> GetAllDrillsAsync(string userId);
		List<string> GetDrillText(DrillDifficulty difficulty, int length);
	}
}
