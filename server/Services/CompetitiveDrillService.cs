using Microsoft.Extensions.Caching.Memory;
using MongoDB.Bson;
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

        public async Task<CompetitiveDrill> CreateCompetitiveDrillAsync(string roomCode, string createdBy)
        {
            // Get the room to get its roomId
            var room = await GetRoomByCodeAsync(roomCode);
            if (room == null)
            {
                throw new InvalidOperationException($"Room with code {roomCode} not found");
            }

            var competitiveDrill = new CompetitiveDrill
            {
                CompetitiveDrillId = ObjectId.GenerateNewId().ToString(),
                RoomId = room.RoomId,
                CreatedBy = createdBy,
                CreatedAt = DateTime.UtcNow,
                State = DrillState.InProgress,
                Players = new List<CompetitiveDrillPlayer>()
            };

            await _competitiveDrills.InsertOneAsync(competitiveDrill);
            
            // Add the new competitive drill ID to the room's associated list
            await _roomService.AddAssociatedCompetitiveDrillIdAsync(roomCode, competitiveDrill.CompetitiveDrillId);
            
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
            try
            {
                var competitiveDrill = await GetCompetitiveDrillAsync(competitiveDrillId);
                if (competitiveDrill == null)
                    return false;

                competitiveDrill.WinnerId = winnerId;
                competitiveDrill.State = DrillState.Completed;

                // Calculate final positions for all players
                CalculateFinalPositionsAsync(competitiveDrill);

                return await UpdateCompetitiveDrillAsync(competitiveDrill);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error setting winner for drill {competitiveDrillId}: {ex.Message}");
                return false;
            }
        }

        private void CalculateFinalPositionsAsync(CompetitiveDrill competitiveDrill)
        {
            try
            {
                // Get all active players (not disconnected)
                var activePlayers = competitiveDrill.Players
                    .Where(p => p.State != PlayerState.Disconnected)
                    .ToList();

                // Sort players by completion percentage (descending), then by WPM (descending), then by accuracy (descending)
                var sortedPlayers = activePlayers
                    .OrderByDescending(p => p.CompletionPercentage)
                    .ThenByDescending(p => p.WPM)
                    .ThenByDescending(p => p.Accuracy)
                    .ToList();

                // Assign 1-based positions
                for (int i = 0; i < sortedPlayers.Count; i++)
                {
                    var playerToUpdate = sortedPlayers[i];
                    var playerInDrill = competitiveDrill.Players.FirstOrDefault(p => p.UserId == playerToUpdate.UserId);
                    if (playerInDrill != null)
                    {
                        playerInDrill.Position = i + 1; // 1-based position
                        Console.WriteLine($"Player {playerInDrill.UserId} assigned position {playerInDrill.Position}");
                    }
                }

                Console.WriteLine($"Final positions calculated for {sortedPlayers.Count} players in drill {competitiveDrill.CompetitiveDrillId}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error calculating final positions for drill {competitiveDrill.CompetitiveDrillId}: {ex.Message}");
            }
        }

        public async Task<List<CompetitiveDrill>> GetDrillsByRoomAsync(string roomCode)
        {
            // Get the room to get its roomId
            var room = await GetRoomByCodeAsync(roomCode);
            if (room == null)
            {
                return new List<CompetitiveDrill>();
            }

            return await _competitiveDrills.Find(d => d.RoomId == room.RoomId).ToListAsync();
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
            Console.WriteLine($"HandleMarathonCompletionAsync called for room {roomCode}, user {userId}");
            
            // get the competitive drill for this room
            var room = await GetRoomByCodeAsync(roomCode);
            if (room?.ActiveCompetitiveDrillId == null)
            {
                Console.WriteLine($"Room or ActiveCompetitiveDrillId not found for room {roomCode}");
                return false;
            }

            var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
            if (competitiveDrill == null)
            {
                Console.WriteLine($"CompetitiveDrill not found for ID {room.ActiveCompetitiveDrillId}");
                return false;
            }

            Console.WriteLine($"Found competitive drill with {competitiveDrill.Players.Count} players");

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
                Console.WriteLine($"Updated player {userId} to Finished state in competitive drill");
            }

            // get active and finished players
            var activePlayers = competitiveDrill.Players
                .Where(p => p.State != PlayerState.Disconnected)
                .ToList();

            var finishedPlayers = activePlayers
                .Where(p => p.State == PlayerState.Finished)
                .ToList();

            Console.WriteLine($"Active players: {activePlayers.Count}, Finished players: {finishedPlayers.Count}");

            // Check if any player completed with decent accuracy (50% or higher)
            const double MIN_ACCURACY_THRESHOLD = 50.0;
            var highAccuracyFinishers = finishedPlayers.Where(p => p.Accuracy >= MIN_ACCURACY_THRESHOLD).ToList();

            if (highAccuracyFinishers.Any())
            {
                // At least one player finished with decent accuracy - end drill immediately
                Console.WriteLine($"High accuracy finisher found (>=50%), ending drill");
                
                // Determine best player from high accuracy finishers only
                var bestHighAccuracyPlayer = highAccuracyFinishers
                    .OrderByDescending(p => p.WPM)
                    .ThenByDescending(p => p.Accuracy)
                    .First();
                
                await SetWinnerAsync(competitiveDrill.CompetitiveDrillId, bestHighAccuracyPlayer.UserId);
                Console.WriteLine($"Winner determined from high accuracy finishers: {bestHighAccuracyPlayer.UserId} (WPM: {bestHighAccuracyPlayer.WPM}, Accuracy: {bestHighAccuracyPlayer.Accuracy})");
                
                await UpdateDrillStateAsync(competitiveDrill.CompetitiveDrillId, DrillState.Completed);
                Console.WriteLine($"Marathon drill completed due to high accuracy finisher");
                return true; // drill completed
            }

            // Check if all players are finished (regardless of accuracy)
            if (finishedPlayers.Count == activePlayers.Count)
            {
                Console.WriteLine($"All players finished, determining winner");
                
                // all players finished - determine winner and end drill
                var winnerId = await DetermineWinnerAsync(competitiveDrill.CompetitiveDrillId);
                if (!string.IsNullOrEmpty(winnerId))
                {
                    await SetWinnerAsync(competitiveDrill.CompetitiveDrillId, winnerId);
                    Console.WriteLine($"Winner determined: {winnerId}");
                }
                
                await UpdateDrillStateAsync(competitiveDrill.CompetitiveDrillId, DrillState.Completed);
                Console.WriteLine($"Marathon drill completed due to all players finished");
                return true; // drill completed
            }

            Console.WriteLine($"Marathon drill not completed yet, waiting for more players");
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

        public async Task<bool> AddPlayerToCompetitiveDrillAsync(string roomCode, string userId)
        {
            try
            {
                // Get the room to find the active competitive drill
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    Console.WriteLine($"No active competitive drill found for room {roomCode}");
                    return false;
                }

                // Get the competitive drill
                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    Console.WriteLine($"Competitive drill not found for ID {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                // Check if player is already in the drill
                if (competitiveDrill.Players.Any(p => p.UserId == userId))
                {
                    Console.WriteLine($"Player {userId} is already in competitive drill {room.ActiveCompetitiveDrillId}");
                    return true; // Player already exists, consider this a success
                }

                // Create new player entry
                var newPlayer = new CompetitiveDrillPlayer
                {
                    UserId = userId,
                    WPM = 0,
                    Accuracy = 0,
                    Position = competitiveDrill.Players.Count + 1,
                    PointsChange = 0,
                    WordsCompleted = 0,
                    TotalWords = 0,
                    CompletionPercentage = 0,
                    DrillId = room.ActiveCompetitiveDrillId, // Use the competitive drill ID as drill ID
                    State = PlayerState.Connected,
                    IsAFK = false
                };

                // Add player to the drill
                competitiveDrill.Players.Add(newPlayer);

                // Update the competitive drill in the database
                var result = await UpdateCompetitiveDrillAsync(competitiveDrill);
                
                if (result)
                {
                    Console.WriteLine($"Successfully added player {userId} to competitive drill {room.ActiveCompetitiveDrillId}");
                }
                else
                {
                    Console.WriteLine($"Failed to update competitive drill when adding player {userId}");
                }

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding player {userId} to competitive drill in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        // Drill-level player management methods
        public async Task<bool> UpdatePlayerStateAsync(string roomCode, string userId, PlayerState state)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    Console.WriteLine($"No active competitive drill found for room {roomCode}");
                    return false;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    Console.WriteLine($"Competitive drill not found for ID {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                var player = competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
                if (player == null)
                {
                    Console.WriteLine($"Player {userId} not found in competitive drill {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                player.State = state;
                Console.WriteLine($"Updated player {userId} state to {state} in drill {room.ActiveCompetitiveDrillId}");

                return await UpdateCompetitiveDrillAsync(competitiveDrill);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating player state for {userId} in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> UpdatePlayerProgressAsync(string roomCode, string userId, PlayerStatistics statistics)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    Console.WriteLine($"No active competitive drill found for room {roomCode}");
                    return false;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    Console.WriteLine($"Competitive drill not found for ID {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                var player = competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
                if (player == null)
                {
                    Console.WriteLine($"Player {userId} not found in competitive drill {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                // Update player statistics
                player.WPM = statistics.WPM;
                player.Accuracy = statistics.Accuracy;
                player.WordsCompleted = statistics.WordsCompleted;
                player.TotalWords = statistics.TotalWords;
                player.CompletionPercentage = (int)Math.Round(statistics.CompletionPercentage);

                // Update position based on completion percentage
                var sortedPlayers = competitiveDrill.Players
                    .Where(p => p.State != PlayerState.Disconnected)
                    .OrderByDescending(p => p.CompletionPercentage)
                    .ThenByDescending(p => p.WPM)
                    .ToList();

                // Calculate positions for ALL players (1-based)
                for (int i = 0; i < sortedPlayers.Count; i++)
                {
                    var playerToUpdate = sortedPlayers[i];
                    var playerInDrill = competitiveDrill.Players.FirstOrDefault(p => p.UserId == playerToUpdate.UserId);
                    if (playerInDrill != null)
                    {
                        playerInDrill.Position = i + 1; // 1-based position
                    }
                }

                Console.WriteLine($"Updated player {userId} progress in drill {room.ActiveCompetitiveDrillId}");

                return await UpdateCompetitiveDrillAsync(competitiveDrill);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating player progress for {userId} in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> MarkPlayerFinishedAsync(string roomCode, string userId, DrillResult result)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    Console.WriteLine($"No active competitive drill found for room {roomCode}");
                    return false;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    Console.WriteLine($"Competitive drill not found for ID {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                var player = competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
                if (player == null)
                {
                    Console.WriteLine($"Player {userId} not found in competitive drill {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                // Update player with final results
                player.State = PlayerState.Finished;
                player.WPM = result.WPM;
                player.Accuracy = result.Accuracy;
                player.WordsCompleted = result.WordsCompleted;
                player.TotalWords = result.TotalWords;
                player.CompletionPercentage = (int)Math.Round(result.CompletionPercentage);
                player.Position = result.Position;
                player.PointsChange = result.PointsChange;

                Console.WriteLine($"Marked player {userId} as finished in drill {room.ActiveCompetitiveDrillId}");

                return await UpdateCompetitiveDrillAsync(competitiveDrill);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error marking player {userId} as finished in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> MarkPlayerDisconnectedAsync(string roomCode, string userId)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    Console.WriteLine($"No active competitive drill found for room {roomCode}");
                    return false;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    Console.WriteLine($"Competitive drill not found for ID {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                var player = competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
                if (player == null)
                {
                    Console.WriteLine($"Player {userId} not found in competitive drill {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                player.State = PlayerState.Disconnected;
                Console.WriteLine($"Marked player {userId} as disconnected in drill {room.ActiveCompetitiveDrillId}");

                return await UpdateCompetitiveDrillAsync(competitiveDrill);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error marking player {userId} as disconnected in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> ReconnectPlayerAsync(string roomCode, string userId)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    Console.WriteLine($"No active competitive drill found for room {roomCode}");
                    return false;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    Console.WriteLine($"Competitive drill not found for ID {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                var player = competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
                if (player == null)
                {
                    Console.WriteLine($"Player {userId} not found in competitive drill {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                // If player was disconnected, reconnect them
                if (player.State == PlayerState.Disconnected)
                {
                    player.State = PlayerState.Connected;
                    Console.WriteLine($"Reconnected player {userId} in drill {room.ActiveCompetitiveDrillId}");
                    return await UpdateCompetitiveDrillAsync(competitiveDrill);
                }

                return true; // Player was already connected
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reconnecting player {userId} in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> ResetPlayerForNextDrillAsync(string roomCode, string userId)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    Console.WriteLine($"No active competitive drill found for room {roomCode}");
                    return false;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    Console.WriteLine($"Competitive drill not found for ID {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                var player = competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
                if (player == null)
                {
                    Console.WriteLine($"Player {userId} not found in competitive drill {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                // Reset player state for next drill
                player.State = PlayerState.Connected;
                player.WPM = 0;
                player.Accuracy = 0;
                player.Position = 0;
                player.PointsChange = 0;
                player.WordsCompleted = 0;
                player.TotalWords = 0;
                player.CompletionPercentage = 0;
                player.IsAFK = false;
                player.HasContinued = false;

                Console.WriteLine($"Reset player {userId} for next drill in {room.ActiveCompetitiveDrillId}");

                return await UpdateCompetitiveDrillAsync(competitiveDrill);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error resetting player {userId} for next drill in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<PlayerState> GetPlayerStateAsync(string roomCode, string userId)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    return PlayerState.Disconnected;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    return PlayerState.Disconnected;
                }

                var player = competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
                return player?.State ?? PlayerState.Disconnected;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting player state for {userId} in room {roomCode}: {ex.Message}");
                return PlayerState.Disconnected;
            }
        }

        public async Task<List<CompetitiveDrillPlayer>> GetActiveDrillPlayersAsync(string roomCode)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    return new List<CompetitiveDrillPlayer>();
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    return new List<CompetitiveDrillPlayer>();
                }

                return competitiveDrill.Players
                    .Where(p => p.State != PlayerState.Disconnected)
                    .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting active drill players for room {roomCode}: {ex.Message}");
                return new List<CompetitiveDrillPlayer>();
            }
        }

        public async Task<CompetitiveDrillPlayer?> GetDrillPlayerAsync(string roomCode, string userId)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    return null;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    return null;
                }

                return competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting drill player {userId} for room {roomCode}: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> IsPlayerInDrillAsync(string roomCode, string userId)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    return false;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    return false;
                }

                return competitiveDrill.Players.Any(p => p.UserId == userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error checking if player {userId} is in drill for room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> IsPlayerFinishedAsync(string roomCode, string userId)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    return false;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    return false;
                }

                var player = competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
                return player?.State == PlayerState.Finished;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error checking if player {userId} is finished in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<int> GetTypingPlayerCountAsync(string roomCode)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    return 0;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    return 0;
                }

                return competitiveDrill.Players
                    .Where(p => p.State == PlayerState.Typing)
                    .Count();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting typing player count for room {roomCode}: {ex.Message}");
                return 0;
            }
        }

        public async Task<int> GetDisconnectedPlayerCountAsync(string roomCode)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    return 0;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    return 0;
                }

                return competitiveDrill.Players
                    .Where(p => p.State == PlayerState.Disconnected)
                    .Count();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting disconnected player count for room {roomCode}: {ex.Message}");
                return 0;
            }
        }

        // continue after drill methods
        public async Task<bool> MarkPlayerContinuedAsync(string roomCode, string userId)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    Console.WriteLine($"No active competitive drill found for room {roomCode}");
                    return false;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    Console.WriteLine($"Competitive drill not found for ID {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                var player = competitiveDrill.Players.FirstOrDefault(p => p.UserId == userId);
                if (player == null)
                {
                    Console.WriteLine($"Player {userId} not found in competitive drill {room.ActiveCompetitiveDrillId}");
                    return false;
                }

                // mark player as continued
                player.HasContinued = true;
                Console.WriteLine($"Marked player {userId} as continued in drill {room.ActiveCompetitiveDrillId}");

                return await UpdateCompetitiveDrillAsync(competitiveDrill);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error marking player {userId} as continued in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> HaveAllPlayersContinuedAsync(string roomCode)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    return false;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    return false;
                }

                var activePlayers = competitiveDrill.Players
                    .Where(p => p.State != PlayerState.Disconnected)
                    .ToList();

                if (!activePlayers.Any())
                {
                    return false;
                }

                return activePlayers.All(p => p.HasContinued);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error checking if all players continued in room {roomCode}: {ex.Message}");
                return false;
            }
        }

        public async Task<int> GetContinuedPlayerCountAsync(string roomCode)
        {
            try
            {
                var room = await GetRoomByCodeAsync(roomCode);
                if (room?.ActiveCompetitiveDrillId == null)
                {
                    return 0;
                }

                var competitiveDrill = await GetCompetitiveDrillAsync(room.ActiveCompetitiveDrillId);
                if (competitiveDrill == null)
                {
                    return 0;
                }

                return competitiveDrill.Players
                    .Where(p => p.State != PlayerState.Disconnected && p.HasContinued)
                    .Count();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting continued player count for room {roomCode}: {ex.Message}");
                return 0;
            }
        }
    }
}