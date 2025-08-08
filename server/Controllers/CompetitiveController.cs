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
        private readonly IUserRoomSessionService _sessionService;
        private readonly IRoomService _roomService;
        private readonly IPlayerService _playerService;
        private readonly IUserService _userService;

        public CompetitiveController(
            IUserRoomSessionService sessionService,
            IRoomService roomService,
            IPlayerService playerService,
            IUserService userService)
        {
            _sessionService = sessionService;
            _roomService = roomService;
            _playerService = playerService;
            _userService = userService;
        }

        [HttpGet("active-room")]
        public async Task<IActionResult> GetActiveRoom()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User not authenticated");
                }

                var session = await _sessionService.GetActiveSessionAsync(userId);
                if (session == null)
                {
                    return Ok(new { hasActiveRoom = false });
                }

                // validate that the room still exists and is active
                var room = await _roomService.GetRoomByCodeAsync(session.RoomCode);
                if (room == null || room.State == RoomState.Finished)
                {
                    // room no longer exists or is finished, clear the session
                    await _sessionService.ClearSessionAsync(userId);
                    return Ok(new { hasActiveRoom = false });
                }

                return Ok(new
                {
                    hasActiveRoom = true,
                    roomCode = session.RoomCode,
                    role = session.Role.ToString(),
                    joinedAt = session.JoinedAt,
                    lastActivityAt = session.LastActivityAt,
                    roomState = room.State.ToString(),
                    roomAvailability = room.Availability.ToString()
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting active room: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("clear-session")]
        public async Task<IActionResult> ClearSession()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User not authenticated");
                }

                await _sessionService.ClearSessionAsync(userId);
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error clearing session: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
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

                // verify that the user is actually in this room
                var session = await _sessionService.GetActiveSessionAsync(userId);
                if (session == null || session.RoomCode != roomCode)
                {
                    return Forbid("User not in this room");
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
