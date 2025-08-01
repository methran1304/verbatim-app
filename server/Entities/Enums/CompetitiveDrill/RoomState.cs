namespace server.Entities.Enums
{
    public enum RoomState
    {
        Waiting,
        Ready,
        InProgress,
        Finished,
        Cancelled
    }

    public enum RoomAvailability
    {
        Available,
        Full,
    }
}