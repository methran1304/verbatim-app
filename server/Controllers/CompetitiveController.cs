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

        public CompetitiveController(
            IRoomService roomService,
            IPlayerService playerService,
            IUserService userService)
        {
            _roomService = roomService;
            _playerService = playerService;
            _userService = userService;
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
                        level = 1, // Default level for now, can be calculated from profile stats later
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
    }
}
