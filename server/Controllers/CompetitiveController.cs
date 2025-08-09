using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Entities;
using server.Entities.Enums;
using server.Services.Interfaces;
using System.Security.Claims;

namespace server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CompetitiveController : BaseController
    {
        private readonly IRoomService _roomService;
        private readonly IPlayerService _playerService;
        private readonly IUserService _userService;
        private readonly IProfileService _profileService;

        public CompetitiveController(
            IRoomService roomService,
            IPlayerService playerService,
            IUserService userService,
            IProfileService profileService)
        {
            _roomService = roomService;
            _playerService = playerService;
            _userService = userService;
            _profileService = profileService;
        }



        [HttpGet("room/{roomCode}/players")]
        public async Task<IActionResult> GetRoomPlayers(string roomCode)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User not authenticated");
                }

                // get players from the room
                var players = _playerService.GetPlayersInRoom(roomCode);
                
                // convert to API response format
                var playersResponse = new List<object>();
                foreach (var player in players)
                {
                    // get user details
                    var user = await _userService.GetByUserId(player.UserId);
                    
                    playersResponse.Add(new
                    {
                        userId = player.UserId,
                        username = user?.Username ?? $"User{player.UserId.Substring(0, 4)}",
                        level = 1, // default level for now, can be calculated from profile stats later
                        state = player.State.ToString(),
                        statistics = player.State == PlayerState.Typing ? new
                        {
                            wpm = player.WPM,
                            accuracy = player.Accuracy,
                            completionPercentage = (int)((player.Position / (double)players.Count) * 100)
                        } : null
                    });
                }

                return Ok(new { players = playersResponse });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting room players: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("statistics/{userId}")]
        public async Task<IActionResult> GetPlayerCompetitiveStatistics(string userId)
        {
            try
            {
                var requestingUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(requestingUserId))
                {
                    return Unauthorized("User not authenticated");
                }

                // get user profile which contains competitive statistics
                var profile = await _profileService.GetByUserId(userId);
                if (profile == null)
                {
                    return Ok(new
                    {
                        totalDrills = 0,
                        wins = 0,
                        losses = 0,
                        winrate = 0.0
                    });
                }

                var winrate = profile.CompetitiveDrills > 0 
                    ? Math.Round((double)profile.Wins / profile.CompetitiveDrills * 100, 1)
                    : 0.0;

                return Ok(new
                {
                    totalDrills = profile.CompetitiveDrills,
                    wins = profile.Wins,
                    losses = profile.Losses,
                    winrate = winrate
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting player competitive statistics: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
