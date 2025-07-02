using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using server.Data.Mongo;
using server.Entities;
using server.Services.Interfaces;

namespace server.Services
{
	public class DrillInputService(MongoDbContext context) : IDrillInputService
	{
        private readonly IMongoCollection<DrillInput> _drillInputs = context.DrillInputs;
        public async Task<List<string>?> GetInputByIdAsync(string drillInputId)
        {
            var filter = Builders<DrillInput>.Filter
                .Eq(di => di.DrillInputId, drillInputId);

            var drillInput = await _drillInputs.Find(filter)
                .FirstOrDefaultAsync();

            return drillInput?.InputText;
        }

		public async Task SaveInputAsync(DrillInput input)
		{
            await _drillInputs.InsertOneAsync(input);
		}
	}
}