using Microsoft.Extensions.Caching.Memory;
using MongoDB.Driver;
using server.Constants;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services.Interfaces;

namespace server.Services
{
    public class CompetitiveDrillService : ICompetitiveDrillService
    {
        private readonly IMongoCollection<CompetitiveDrill> _competitiveDrills;
        private readonly IMongoCollection<Drill> _drills;
        private readonly IRoomService _roomService;

        public CompetitiveDrillService(MongoDbContext context, IRoomService roomService)
        {
            _competitiveDrills = context.CompetitiveDrills;
            _drills = context.Drills;
            _roomService = roomService;
        }

        public async Task<CompetitiveDrill> CreateCompetitiveDrillAsync(string roomId, string createdBy)
        {
            var competitiveDrill = new CompetitiveDrill
            {
                CompetitiveDrillId = Guid.NewGuid().ToString(),
                RoomId = roomId,
                CreatedBy = createdBy,
                CreatedAt = DateTime.UtcNow,
                State = DrillState.NotStarted,
                Players = new List<CompetitiveDrillPlayer>()
            };

            await _competitiveDrills.InsertOneAsync(competitiveDrill);
            return competitiveDrill;
        }



        public async Task<CompetitiveDrill?> GetCompetitiveDrillAsync(string competitiveDrillId)
        {
            return await _competitiveDrills.Find(d => d.CompetitiveDrillId == competitiveDrillId).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateCompetitiveDrillAsync(CompetitiveDrill drill)
        {
            var result = await _competitiveDrills.ReplaceOneAsync(
                d => d.CompetitiveDrillId == drill.CompetitiveDrillId,
                drill
            );
            return result.ModifiedCount > 0;
        }

        public async Task<bool> UpdateDrillStateAsync(string competitiveDrillId, DrillState state)
        {
            var result = await _competitiveDrills.UpdateOneAsync(
                d => d.CompetitiveDrillId == competitiveDrillId,
                Builders<CompetitiveDrill>.Update.Set(d => d.State, state)
            );
            return result.ModifiedCount > 0;
        }

        public async Task<bool> SetWinnerAsync(string competitiveDrillId, string winnerId)
        {
            var result = await _competitiveDrills.UpdateOneAsync(
                d => d.CompetitiveDrillId == competitiveDrillId,
                Builders<CompetitiveDrill>.Update.Set(d => d.WinnerId, winnerId)
            );
            return result.ModifiedCount > 0;
        }

        public async Task<List<CompetitiveDrill>> GetDrillsByRoomAsync(string roomId)
        {
            return await _competitiveDrills.Find(d => d.RoomId == roomId).ToListAsync();
        }

        public async Task<string?> DetermineWinnerAsync(string competitiveDrillId)
        {
            var competitiveDrill = await GetCompetitiveDrillAsync(competitiveDrillId);
            if (competitiveDrill?.Players == null || !competitiveDrill.Players.Any())
                return null;

            // filter out disconnected players
            var activePlayers = competitiveDrill.Players
                .Where(p => p.State != PlayerState.Disconnected)
                .ToList();

            if (!activePlayers.Any())
                return null;

            // determine winner based on highest WPM, then highest accuracy
            var winner = activePlayers
                .OrderByDescending(p => p.WPM)
                .ThenByDescending(p => p.Accuracy)
                .First();

            return winner.UserId;
        }

        public async Task<bool> IsDrillCompletedAsync(string competitiveDrillId)
        {
            var competitiveDrill = await GetCompetitiveDrillAsync(competitiveDrillId);
            return competitiveDrill?.State == DrillState.Completed;
        }

        public async Task<bool> HandleMarathonCompletionAsync(string roomCode, string userId, DrillResult result)
        {
            // get the competitive drill for this room
            var room = await GetRoomByCodeAsync(roomCode);
            if (room?.ActiveCompetitiveDrillId == null)
                return false;

            var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
            if (competitiveDrill == null)
                return false;

            // update player in competitive drill
            var player = competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
            if (player != null)
            {
                player.WPM = result.WPM;
                player.Accuracy = result.Accuracy;
                player.Position = result.Position;
                player.PointsChange = result.PointsChange;
                player.State = PlayerState.Finished;

                await UpdateCompetitiveDrillAsync(competitiveDrill);
            }

            // check if all active players are finished
            var activePlayers = competitiveDrill.Players
                .Where(p => p.State != PlayerState.Disconnected)
                .ToList();

            var finishedPlayers = activePlayers
                .Where(p => p.State == PlayerState.Finished)
                .ToList();

            if (finishedPlayers.Count == activePlayers.Count)
            {
                // all players finished - determine winner and end drill
                var winnerId = await DetermineWinnerAsync(competitiveDrill.CompetitiveDrillId);
                if (!string.IsNullOrEmpty(winnerId))
                {
                    await SetWinnerAsync(competitiveDrill.CompetitiveDrillId, winnerId);
                }
                
                await UpdateDrillStateAsync(competitiveDrill.CompetitiveDrillId, DrillState.Completed);
                return true; // drill completed
            }

            return false; // still waiting for other players
        }

        public async Task<int> GetFinishedPlayerCountAsync(string roomCode)
        {
            var room = await GetRoomByCodeAsync(roomCode);
            if (room?.ActiveCompetitiveDrillId == null)
                return 0;

            var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
            if (competitiveDrill == null)
                return 0;

            return competitiveDrill.Players
                .Where(p => p.State == PlayerState.Finished)
                .Count();
        }

        public async Task<int> GetActivePlayerCountAsync(string roomCode)
        {
            var room = await GetRoomByCodeAsync(roomCode);
            if (room?.ActiveCompetitiveDrillId == null)
                return 0;

            var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
            if (competitiveDrill == null)
                return 0;

            return competitiveDrill.Players
                .Where(p => p.State != PlayerState.Disconnected)
                .Count();
        }

        private async Task<Room?> GetRoomByCodeAsync(string roomCode)
        {
            return await _roomService.GetRoomByCodeAsync(roomCode);
        }


    }
}