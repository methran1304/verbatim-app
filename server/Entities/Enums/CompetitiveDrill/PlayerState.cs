namespace server.Entities.Enums
{
    public enum PlayerState
    {
        Connected,    // Just joined the room
        Ready,        // Ready to start drill
        Typing,       // Currently in drill
        Finished,     // Completed drill
        Disconnected  // Left/connection lost
    }
}
