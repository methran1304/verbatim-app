using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities.Core;

namespace server.Services.Interfaces
{
    public interface IDrillSourceTextService
    {
        Task SaveSourceTextAsync(DrillSourceText drillSourceText);
        Task<DrillSourceText?> GetDrillSourceTextById(string drillSourceTextId);
    }
}