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

        public async Task<FuzzySearchResponse> GetSimilarWordsAsync(List<string> errorProneWords, DrillDifficulty drillDifficulty, int top)
        {
            string microserviceUrl = _configuration.GetValue<string>("FuzzySearchMicroservice:ConnectionString")!;

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

            // fill missing words to ensure we get the requested count
            var filledResult = FillMissingWords(result ?? new FuzzySearchResponse(), errorProneWords, difficultyFilteredWords, top);

            return filledResult;
        }

        private FuzzySearchResponse FillMissingWords(FuzzySearchResponse result, List<string> errorProneWords, List<string> wordPool, int targetCount)
        {
            Console.WriteLine("Triggered 'FillMissingWords'");

            var random = new Random();
            var usedWords = new HashSet<string>();

            // collect all words already used
            foreach (var similarWords in result.SimilarWords.Values)
            {
                foreach (var word in similarWords)
                {
                    usedWords.Add(word);
                }
            }

            // fill missing words for each error-prone word
            foreach (var errorProneWord in errorProneWords)
            {
                if (!result.SimilarWords.ContainsKey(errorProneWord))
                {
                    result.SimilarWords[errorProneWord] = new List<string>();
                }

                var currentWords = result.SimilarWords[errorProneWord];
                var neededCount = targetCount - currentWords.Count;

                if (neededCount > 0)
                {
                    // get available words (not already used)
                    var availableWords = wordPool.Where(w => !usedWords.Contains(w) && !currentWords.Contains(w)).ToList();

                    if (availableWords.Count >= neededCount)
                    {
                        // randomly select needed words
                        var randomWords = availableWords.OrderBy(x => random.Next()).Take(neededCount).ToList();
                        currentWords.AddRange(randomWords);
                        usedWords.UnionWith(randomWords);
                    }
                    else
                    {
                        // ff not enough words available, just add what we have
                        currentWords.AddRange(availableWords);
                        usedWords.UnionWith(availableWords);
                    }
                }
            }

            return result;
        }
    }
}
