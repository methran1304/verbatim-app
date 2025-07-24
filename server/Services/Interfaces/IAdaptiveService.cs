using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface IAdaptiveService
    {
        Task<List<string>> GetAdaptiveDrillWordsAsync(string userId, DrillDifficulty difficulty, int count);
        Task<bool> CanGenerateAdaptiveDrillWordsAsync(string userId, DrillDifficulty difficulty);
    }
}