using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Entities;
using server.Entities.Enums;
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CompetitiveDrillController : ControllerBase
    {
        private readonly IUserRoomSessionService _sessionService;
        private readonly IRoomService _roomService;

        public CompetitiveDrillController(
            IUserRoomSessionService sessionService,
            IRoomService roomService)
        {
            _sessionService = sessionService;
            _roomService = roomService;
        }

        [HttpGet("active-room")]
        public async Task<IActionResult> GetActiveRoom()
        {
            try
            {
                var userId = User.FindFirst("sub")?.Value;
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
                var userId = User.FindFirst("sub")?.Value;
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
    }
}
