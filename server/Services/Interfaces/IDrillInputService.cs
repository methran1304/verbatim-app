using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;

namespace server.Services.Interfaces
{
    public interface IDrillInputService
    {
        Task SaveInputAsync(DrillInput input);
        Task<List<string>?> GetInputByIdAsync(string drillInputId);
    }
}