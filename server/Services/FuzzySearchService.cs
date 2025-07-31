using MongoDB.Driver;
using MongoDB.Driver.Linq;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;
using server.Services.Interfaces;
using server.Utils;

namespace server.Services
{
    public class FuzzySearchService : IFuzzySearchService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly WordPoolManager _wordPoolManager;

        public FuzzySearchService(
            HttpClient httpClient,
            IConfiguration configuration,
            WordPoolManager wordPoolManager)
        {
            _httpClient = httpClient;
            _configuration = configuration;
			_wordPoolManager = wordPoolManager;
        }

        public async Task<FuzzySearchResponse> GetSimilarWordsAsync(List<string> errorProneWords, DrillDifficulty drillDifficulty, int top, int totalWords)
        {
            string microserviceUrl = _configuration.GetValue<string>("FuzzySearchMicroservice:ConnectionString")!;

            Console.WriteLine(microserviceUrl);

            List<string> difficultyFilteredWords = _wordPoolManager.GetWordsByDifficulty(drillDifficulty.ToString());

            FuzzySearchRequest request = new FuzzySearchRequest
            {
                ErrorProneWords = errorProneWords,
                WordPool = difficultyFilteredWords,
                TopN = top
            };

            var response = await _httpClient.PostAsJsonAsync(microserviceUrl + "/get-fuzzy-matches", request);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<FuzzySearchResponse>();

            return result ?? new FuzzySearchResponse();
        }
    }
}
