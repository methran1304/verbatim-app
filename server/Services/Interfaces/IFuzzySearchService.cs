using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver.Core.Servers;
using server.Entities.Core;
using server.Entities.Enums;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface IFuzzySearchService
    {
        Task<FuzzySearchResponse> GetSimilarWordsAsync(List<string> errorProneWords, DrillDifficulty drillDifficulty, int top);
    }
}