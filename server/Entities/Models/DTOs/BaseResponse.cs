namespace server.Entities.Models.DTOs
{
    public class BaseResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}