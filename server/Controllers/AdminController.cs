using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Enums;
using MongoDB.Driver;
using MongoDB.Bson;
using server.Services;

namespace server.Controllers
{
	[ApiController]
	[Route("api/admin")]
	public class AdminController : ControllerBase
	{
		private readonly IProfileService _profileService;
		private readonly IUserService _userService;
		private readonly MongoDbContext _context;
		private readonly ILevelCalculationService _levelCalculationService;
		
		public AdminController(
			IProfileService profileService, 
			IUserService userService, 
			MongoDbContext context,
			ILevelCalculationService levelCalculationService)
		{
			_profileService = profileService;
			_userService = userService;
			_context = context;
			_levelCalculationService = levelCalculationService;
		}
		
		[HttpPost("clear-all-book-progress")]
		public async Task<IActionResult> ClearAllBookProgress()
		{
			try
			{
				var result = await _profileService.ClearAllBookProgress();
				
				if (result)
				{
					return Ok(new { message = "All book progress cleared successfully", success = true });
				}
				else
				{
					return BadRequest(new { message = "Failed to clear book progress", success = false });
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Error clearing book progress: {ex.Message}", success = false });
			}
		}
		
		[HttpPost("clear-all-ai-feedback")]
		public async Task<IActionResult> ClearAllAiFeedback()
		{
			try
			{
				var result = await _profileService.ClearAllAiFeedback();
				
				if (result)
				{
					return Ok(new { message = "All AI feedback cleared successfully", success = true });
				}
				else
				{
					return BadRequest(new { message = "Failed to clear AI feedback", success = false });
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Error clearing AI feedback: {ex.Message}", success = false });
			}
		}
		
		[HttpPost("seed-database")]
		public async Task<IActionResult> SeedDatabase()
		{
			try
			{
				var random = new Random();
				var usersCreated = 0;
				var competitiveDrillsCreated = 0;
				
				// Create 100 users with realistic data
				for (int i = 1; i <= 100; i++)
				{
					var username = $"user{i:D3}";
					var email = $"user{i:D3}@example.com";
					
					// Check if user already exists
					var existingUser = await _userService.GetByUsernameAsync(username);
					if (existingUser != null) continue;
					
					// Create user
					var user = new User
					{
						Username = username,
						EmailAddress = email,
						PasswordHash = "dummy_hash", // Not used for seeded users
						AuthProvider = AuthenticationProviders.Local,
						CreatedAt = DateTime.UtcNow.AddDays(-random.Next(1, 365))
					};
					
					await _userService.CreateAsync(user);
					usersCreated++;
					
					// Create profile with realistic stats based on skill level
					var skillLevel = random.NextDouble();
					var profile = GenerateRealisticProfile(user.UserId, skillLevel, random);
					
					await _context.Profiles.InsertOneAsync(profile);
				}
				
				// Create competitive drills to populate win/loss records
				var allUsers = await _context.Users.Find(_ => true).ToListAsync();
				var seededUsers = allUsers.Where(u => u.Username.StartsWith("user")).ToList();
				
				// Create competitive drills between random pairs
				for (int i = 0; i < 500; i++) // Create 500 competitive drills
				{
					if (seededUsers.Count < 2) break;
					
					var player1 = seededUsers[random.Next(seededUsers.Count)];
					var player2 = seededUsers[random.Next(seededUsers.Count)];
					
					if (player1.UserId == player2.UserId) continue;
					
					var drill = await GenerateCompetitiveDrill(player1, player2, random);
					await _context.CompetitiveDrills.InsertOneAsync(drill);
					
					// Update profiles with win/loss data
					await UpdateProfilesAfterDrill(drill, random);
					competitiveDrillsCreated++;
				}
				
				return Ok(new { 
					message = $"Database seeded successfully. Created {usersCreated} users and {competitiveDrillsCreated} competitive drills.", 
					success = true,
					usersCreated,
					competitiveDrillsCreated
				});
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Error seeding database: {ex.Message}", success = false });
			}
		}
		
		private Profile GenerateRealisticProfile(string userId, double skillLevel, Random random)
		{
			// Skill-based stats generation
			// skillLevel: 0.0 (beginner) to 1.0 (expert)
			
			// Base WPM ranges: Beginner: 20-40, Intermediate: 40-65, Advanced: 65-85, Expert: 85-120
			var baseWpm = skillLevel switch
			{
				< 0.25 => random.Next(20, 41),   // Beginner
				< 0.5 => random.Next(40, 66),    // Intermediate  
				< 0.75 => random.Next(65, 86),   // Advanced
				_ => random.Next(85, 121)        // Expert
			};
			
			// Max WPM is typically 10-30% higher than average
			var maxWpm = baseWpm + random.Next(5, (int)(baseWpm * 0.3));
			
			// Accuracy based on skill level (85-99%)
			var baseAccuracy = skillLevel switch
			{
				< 0.25 => 85 + random.NextDouble() * 8,  // 85-93%
				< 0.5 => 90 + random.NextDouble() * 6,   // 90-96%
				< 0.75 => 93 + random.NextDouble() * 5,  // 93-98%
				_ => 95 + random.NextDouble() * 4         // 95-99%
			};
			
			var maxAccuracy = Math.Min(99.9, baseAccuracy + random.NextDouble() * 3);
			
			// Error rate inversely proportional to skill
			var errorRate = skillLevel switch
			{
				< 0.25 => 8 + random.NextDouble() * 7,   // 8-15%
				< 0.5 => 4 + random.NextDouble() * 6,    // 4-10%
				< 0.75 => 2 + random.NextDouble() * 4,   // 2-6%
				_ => 0.5 + random.NextDouble() * 2.5      // 0.5-3%
			};
			
			// Total drills and points based on activity level
			var activityLevel = random.NextDouble(); // How active the user is
			var totalDrills = (int)(activityLevel * 200 + 10); // 10-210 drills
			var userPoints = (int)(skillLevel * activityLevel * 8000 + random.Next(100, 500));
			
			// Competitive stats
			var competitiveDrills = (int)(activityLevel * 50); // 0-50 competitive drills
			var winRate = skillLevel * 0.4 + 0.3 + random.NextDouble() * 0.2; // 30-90% win rate based on skill
			var wins = (int)(competitiveDrills * winRate);
			var losses = competitiveDrills - wins;
			var competitivePoints = (int)(skillLevel * 2000 + wins * 25 - losses * 10 + random.Next(-100, 101));
			
			// Determine competitive rank based on competitive points
			var competitiveRank = competitivePoints switch
			{
				< 100 => CompetitiveRank.Bronze,
				< 300 => CompetitiveRank.Silver,
				< 600 => CompetitiveRank.Gold,
				< 1000 => CompetitiveRank.Platinum,
				< 1500 => CompetitiveRank.Diamond,
				< 2000 => CompetitiveRank.Master,
				_ => CompetitiveRank.Grandmaster
			};
			
			// Calculate level based on points
			var overallLevel = _levelCalculationService.CalculateCasualLevel(userPoints);
			
			return new Profile
			{
				ProfileId = userId,
				UserPoints = Math.Max(0, userPoints),
				MaxWPM = maxWpm,
				AvgWPM = baseWpm,
				MaxAccuracy = maxAccuracy,
				AvgAccuracy = baseAccuracy,
				AvgErrorRate = Math.Round(errorRate, 1),
				TotalDrillsParticipated = totalDrills,
				CompetitiveDrills = competitiveDrills,
				Wins = wins,
				Losses = losses,
				CompetitivePoints = Math.Max(0, competitivePoints),
				CompetitiveRank = competitiveRank,
				OverallLevel = overallLevel
			};
		}
		
		private async Task<CompetitiveDrill> GenerateCompetitiveDrill(User player1, User player2, Random random)
		{
			// Get profiles to determine skill levels for realistic results
			var profile1 = await _context.Profiles.Find(p => p.ProfileId == player1.UserId).FirstOrDefaultAsync();
			var profile2 = await _context.Profiles.Find(p => p.ProfileId == player2.UserId).FirstOrDefaultAsync();
			
			var player1AvgWpm = profile1?.AvgWPM ?? 50;
			var player2AvgWpm = profile2?.AvgWPM ?? 50;
			
			// Generate realistic drill results with some randomness
			var player1Wpm = Math.Max(10, player1AvgWpm + random.Next(-15, 16));
			var player2Wpm = Math.Max(10, player2AvgWpm + random.Next(-15, 16));
			
			var player1Accuracy = Math.Max(70, (profile1?.AvgAccuracy ?? 85) + random.NextDouble() * 10 - 5);
			var player2Accuracy = Math.Max(70, (profile2?.AvgAccuracy ?? 85) + random.NextDouble() * 10 - 5);
			
			// Determine winner based on WPM and accuracy (WPM weighted more heavily)
			var player1Score = player1Wpm * (player1Accuracy / 100);
			var player2Score = player2Wpm * (player2Accuracy / 100);
			
			var winnerId = player1Score > player2Score ? player1.UserId : player2.UserId;
			
			var wordsInDrill = random.Next(50, 200);
			
			return new CompetitiveDrill
			{
				RoomId = Guid.NewGuid().ToString(),
				CreatedBy = player1.UserId,
				WinnerId = winnerId,
				State = DrillState.Completed,
				CreatedAt = DateTime.UtcNow.AddDays(-random.Next(1, 30)),
				Players = new List<CompetitiveDrillPlayer>
				{
					new()
					{
						UserId = player1.UserId,
						WPM = player1Wpm,
						Accuracy = player1Accuracy,
						Position = player1Score > player2Score ? 1 : 2,
						PointsChange = player1Score > player2Score ? random.Next(15, 31) : random.Next(-20, -5),
						WordsCompleted = wordsInDrill,
						TotalWords = wordsInDrill,
						CompletionPercentage = 100,
						DrillId = ObjectId.GenerateNewId().ToString(),
						State = PlayerState.Finished
					},
					new()
					{
						UserId = player2.UserId,
						WPM = player2Wpm,
						Accuracy = player2Accuracy,
						Position = player2Score > player1Score ? 1 : 2,
						PointsChange = player2Score > player1Score ? random.Next(15, 31) : random.Next(-20, -5),
						WordsCompleted = wordsInDrill,
						TotalWords = wordsInDrill,
						CompletionPercentage = 100,
						DrillId = ObjectId.GenerateNewId().ToString(),
						State = PlayerState.Finished
					}
				}
			};
		}
		
		private async Task UpdateProfilesAfterDrill(CompetitiveDrill drill, Random random)
		{
			foreach (var player in drill.Players)
			{
				var filter = Builders<Profile>.Filter.Eq(p => p.ProfileId, player.UserId);
				var profile = await _context.Profiles.Find(filter).FirstOrDefaultAsync();
				
				if (profile != null)
				{
					var isWinner = drill.WinnerId == player.UserId;
					
					var update = Builders<Profile>.Update
						.Inc(p => p.CompetitiveDrills, 1)
						.Inc(p => p.CompetitivePoints, player.PointsChange);
					
					if (isWinner)
					{
						update = update.Inc(p => p.Wins, 1);
					}
					else
					{
						update = update.Inc(p => p.Losses, 1);
					}
					
					// Update competitive rank based on new points
					var newPoints = Math.Max(0, profile.CompetitivePoints + player.PointsChange);
					var newRank = newPoints switch
					{
						< 100 => CompetitiveRank.Bronze,
						< 300 => CompetitiveRank.Silver,
						< 600 => CompetitiveRank.Gold,
						< 1000 => CompetitiveRank.Platinum,
						< 1500 => CompetitiveRank.Diamond,
						< 2000 => CompetitiveRank.Master,
						_ => CompetitiveRank.Grandmaster
					};
					
					update = update.Set(p => p.CompetitiveRank, newRank);
					
					await _context.Profiles.UpdateOneAsync(filter, update);
				}
			}
		}
	}
}
