using System.Text.Json;
using MongoDB.Driver;
using server.Data.Mongo;
using server.Entities.Core;

namespace server.Utils
{
    public class WordPoolManager
    {
        private readonly MongoDbContext _mongoDbContext;
        private static WordPool? _staticWordPool;

        public WordPoolManager(MongoDbContext mongoDbContext)
        {
            _mongoDbContext = mongoDbContext;
        }

        public async Task InitializeWordPoolAsync(bool initializeDatabase = false)
        {
            if (initializeDatabase)
            {
                await InitializeDatabaseFromJsonAsync();
            }
            else
            {
                await LoadFromDatabaseToStaticAsync();
            }
        }

        private async Task InitializeDatabaseFromJsonAsync()
        {
            try
            {
                await _mongoDbContext.WordPools.Database.DropCollectionAsync("wordPools");
                
                var wordPoolData = await LoadWordPoolFromJsonAsync();
                await _mongoDbContext.WordPools.InsertOneAsync(wordPoolData);
                _staticWordPool = wordPoolData;
                
                Console.WriteLine($"Word pool initialized with {wordPoolData.Beginner.Count} beginner, {wordPoolData.Intermediate.Count} intermediate, {wordPoolData.Advanced.Count} advanced words.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error initializing word pool: {ex.Message}");
                throw;
            }
        }

        private async Task LoadFromDatabaseToStaticAsync()
        {
            try
            {
                var wordPool = await _mongoDbContext.WordPools.Find(Builders<WordPool>.Filter.Empty).FirstOrDefaultAsync();
                if (wordPool == null)
                {
                    throw new InvalidOperationException("Word pool not found in database. Please initialize the database first.");
                }
                
                _staticWordPool = wordPool;
                Console.WriteLine($"Word pool loaded: {wordPool.Beginner.Count} beginner, {wordPool.Intermediate.Count} intermediate, {wordPool.Advanced.Count} advanced words.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading word pool: {ex.Message}");
                throw;
            }
        }

        private async Task<WordPool> LoadWordPoolFromJsonAsync()
        {
            var jsonContent = await File.ReadAllTextAsync("Constants/word-pool.json");
            var jsonData = JsonSerializer.Deserialize<Dictionary<string, List<string>>>(jsonContent);

            if (jsonData == null)
            {
                throw new InvalidOperationException("Failed to deserialize word pool JSON data");
            }

            return new WordPool
            {
                Beginner = jsonData.GetValueOrDefault("beginner", new List<string>()),
                Intermediate = jsonData.GetValueOrDefault("intermediate", new List<string>()),
                Advanced = jsonData.GetValueOrDefault("advanced", new List<string>()),
                LastUpdated = DateTime.UtcNow
            };
        }

        public List<string> GetWordsByDifficulty(string difficulty)
        {
            if (_staticWordPool == null)
            {
                throw new InvalidOperationException("Word pool not initialized. Call InitializeWordPoolAsync() first.");
            }

            return difficulty.ToLower() switch
            {
                "beginner" => _staticWordPool.Beginner.ToList(),
                "intermediate" => _staticWordPool.Intermediate.ToList(),
                "advanced" => _staticWordPool.Advanced.ToList(),
                _ => throw new ArgumentException($"Invalid difficulty: {difficulty}")
            };
        }

        public List<string> GetAllWords()
        {
            if (_staticWordPool == null)
            {
                throw new InvalidOperationException("Word pool not initialized. Call InitializeWordPoolAsync() first.");
            }

            var allWords = new List<string>();
            allWords.AddRange(_staticWordPool.Beginner);
            allWords.AddRange(_staticWordPool.Intermediate);
            allWords.AddRange(_staticWordPool.Advanced);
            
            return allWords;
        }
    }
} 