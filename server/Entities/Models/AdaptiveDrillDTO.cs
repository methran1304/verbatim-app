using server.Entities.Enums;

namespace server.Entities.Models
{
    public class AdaptiveDrillResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public FuzzySearchResponse? FuzzySearchResponse { get; set; }
    }

    public class ErrorProneWordsResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<string>? ErrorProneWords { get; set; }
    }
}