using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using server.Data.Mongo;
using server.Entities.Core;
using server.Services.Interfaces;

namespace server.Services
{
	public class DrillSourceTextService(MongoDbContext context) : IDrillSourceTextService
	{
        private readonly IMongoCollection<DrillSourceText> _drillSourceTexts = context.DrillSourceTexts;
        public async Task<DrillSourceText?> GetDrillSourceTextById(string drillSourceTextId)
        {
            var filter = Builders<DrillSourceText>
                .Filter
                .Eq(dst => dst.DrillSourceId, drillSourceTextId);

            return await _drillSourceTexts.Find(filter)
                .FirstOrDefaultAsync();
        }

		public async Task SaveSourceTextAsync(DrillSourceText drillSourceText)
		{
            await _drillSourceTexts.InsertOneAsync(drillSourceText);
		}
	}
}