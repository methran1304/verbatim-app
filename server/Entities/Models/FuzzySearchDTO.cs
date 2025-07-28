namespace server.Entities.Models
{
    public class FuzzySearchRequest
    {
        public List<string> ErrorProneWords { get; set; } = new();
        public List<string> WordPool {get; set;} = new();
        public int TopN { get; set; }
	}

    public class FuzzySearchResponse
    {
        public Dictionary<string, List<string>> SimilarWords { get; set; } = new();
    }
}
