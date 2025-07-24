using System.Text.Json;
using MongoDB.Driver;
using server.Data.Mongo;
using server.Entities.Core;

namespace server.Utils
{
    public class WordPoolManager
    {
        private readonly MongoDbContext _mongoDbContext;
        private readonly string _wordPoolJsonPath;

        // static storage for word pool data
        private static readonly object _staticLock = new object();
        private static WordPool? _staticWordPool;
        private static bool _isStaticInitialized = false;

        public WordPoolManager(MongoDbContext mongoDbContext, string wordPoolJsonPath = "Constants/word-pool.json")
        {
            _mongoDbContext = mongoDbContext;
            _wordPoolJsonPath = wordPoolJsonPath;
        }

        public async Task InitializeWordPoolAsync(bool initializeDatabase = false)
        {
            try
            {
                if (initializeDatabase)
                {
                    // initialize database from json file
                    await InitializeDatabaseFromJsonAsync();
                }
                else
                {
                    // load from database into static storage
                    await LoadFromDatabaseToStaticAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error initializing word pool: {ex.Message}");
                throw;
            }
        }

        public async Task InitializeDatabaseFromJsonAsync()
        {
            try
            {
                // drop existing collection if it exists
                try
                {
                    await _mongoDbContext.WordPools.Database.DropCollectionAsync("wordPools");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error dropping word pool collection: {ex.Message}");
                    // don't throw here as the collection might not exist
                }

                // load word pool data from json file
                var wordPoolData = await LoadWordPoolFromJsonAsync();

                // insert the word pool data
                await _mongoDbContext.WordPools.InsertOneAsync(wordPoolData);

                // also update static storage
                lock (_staticLock)
                {
                    _staticWordPool = wordPoolData;
                    _isStaticInitialized = true;
                }

                Console.WriteLine($"Word pool collection initialized successfully with {wordPoolData.Short.Count} short words, {wordPoolData.Medium.Count} medium words, and {wordPoolData.Long.Count} long words.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error initializing word pool collection: {ex.Message}");
                throw;
            }
        }

        public async Task LoadFromDatabaseToStaticAsync()
        {
            try
            {
                var wordPool = await GetCurrentWordPoolAsync() ?? throw new InvalidOperationException("Word pool not found in database. Please initialize the database first.");
                
				lock (_staticLock)
                {
                    _staticWordPool = wordPool;
                    _isStaticInitialized = true;
                }

                Console.WriteLine($"Word pool loaded from database into static storage with {wordPool.Short.Count} short words, {wordPool.Medium.Count} medium words, and {wordPool.Long.Count} long words.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading word pool from database: {ex.Message}");
                throw;
            }
        }

        private async Task<WordPool> LoadWordPoolFromJsonAsync()
        {
            try
            {
                if (!File.Exists(_wordPoolJsonPath))
                {
                    throw new FileNotFoundException($"Word pool JSON file not found at: {_wordPoolJsonPath}");
                }

                var jsonContent = await File.ReadAllTextAsync(_wordPoolJsonPath);
                var jsonData = JsonSerializer.Deserialize<Dictionary<string, List<string>>>(jsonContent);

                if (jsonData == null)
                {
                    throw new InvalidOperationException("Failed to deserialize word pool JSON data");
                }

                return new WordPool
                {
                    Short = jsonData.GetValueOrDefault("short", new List<string>()),
                    Medium = jsonData.GetValueOrDefault("medium", new List<string>()),
                    Long = jsonData.GetValueOrDefault("long", new List<string>()),
                    LastUpdated = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading word pool from JSON: {ex.Message}");
                throw;
            }
        }

        public async Task<WordPool?> GetCurrentWordPoolAsync()
        {
            try
            {
                return await _mongoDbContext.WordPools.Find(Builders<WordPool>.Filter.Empty).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving word pool from database: {ex.Message}");
                throw;
            }
        }

        public List<string> GetRandomWords(string category, int count)
        {
            try
            {
                EnsureStaticInitialized();

                List<string> words = category.ToLower() switch
                {
                    "short" => _staticWordPool!.Short,
                    "medium" => _staticWordPool!.Medium,
                    "long" => _staticWordPool!.Long,
                    _ => throw new ArgumentException($"Invalid category: {category}. Must be 'short', 'medium', or 'long'")
                };

                if (count > words.Count)
                {
                    count = words.Count;
                }

                var random = new Random();
                return words.OrderBy(x => random.Next()).Take(count).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting random words: {ex.Message}");
                throw;
            }
        }

        public List<string> GetWordsByDifficulty(string difficulty, int count)
        {
            try
            {
                EnsureStaticInitialized();

                List<string> words = difficulty.ToLower() switch
                {
                    "short" => _staticWordPool!.Short,
                    "medium" => _staticWordPool!.Medium,
                    "long" => _staticWordPool!.Long,
                    _ => throw new ArgumentException($"Invalid difficulty: {difficulty}. Must be 'short', 'medium', or 'long'")
                };

                if (count > words.Count)
                {
                    count = words.Count;
                }

                return words.Take(count).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting words by difficulty: {ex.Message}");
                throw;
            }
        }

        private void EnsureStaticInitialized()
        {
            if (!_isStaticInitialized || _staticWordPool == null)
            {
                throw new InvalidOperationException("Static word pool is not initialized. Call InitializeWordPoolAsync() first.");
            }
        }
    }
} 