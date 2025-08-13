using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using MongoDB.Driver;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Models;
using server.Services.Interfaces;

namespace server.Services
{
  public class AIInsightService : IAIInsightService
  {
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly IDrillService _drillService;
    private readonly IUserService _userService;
    private readonly IProfileService _profileService;
    private readonly IMongoCollection<Profile> _profiles;
    private readonly IMongoCollection<User> _users;

    const string GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
    const string GEMINI_API_KEY = "AIzaSyCDPf8O4kkrlO0yKBDrymibceBAkdK0oxA";

    const string prompt = @"
You are an expert typing coach analyzing detailed performance data for adaptive drill generation.

Analyze this comprehensive typing data and provide detailed pattern analysis with SPECIFIC, ACTIONABLE recommendations:

DATA:
_string_to_be_replaced_

Focus on:
1. Word-level error patterns and why they occur
2. Character-level mistakes and their frequency
3. Recent vs historical performance trends
4. Specific patterns that cause repeated failures
5. Recommendations for adaptive drill word selection
6. Keyboard zone weaknesses and finger coordination issues

IMPORTANT: You MUST provide specific, actionable recommendations in the immediateActions section:
- criticalIssues: List 3-5 most critical problems that need immediate attention
- quickFixes: List 3-5 specific, implementable solutions for immediate improvement
- nextDrillFocus: List 3-5 specific drill types, words, or character combinations to practice

Provide detailed, actionable insights for improving typing accuracy and speed. Be specific and practical in your recommendations.
";

    public AIInsightService(HttpClient httpClient, IConfiguration configuration, IDrillService drillService, IUserService userService, IProfileService profileService, MongoDbContext context)
    {
      _httpClient = httpClient;
      _configuration = configuration;
      _drillService = drillService;
      _userService = userService;
      _profileService = profileService;
      _profiles = context.Profiles;
      _users = context.Users;
    }

    public async Task<object> GetRequestStatisticsAsync(string userId)
    {
      var drills = await _drillService.GetAllDrillsAsync(userId);

      var combinedWordErrorMap = drills
          .SelectMany(d => d.Statistics.ErrorMap.WordErrorMap)
          .GroupBy(kvp => kvp.Key)
          .ToDictionary(
              group => group.Key,
              group => group.Sum(kvp => kvp.Value)
          );

      var combinedCharErrorMap = drills
          .SelectMany(d => d.Statistics.ErrorMap.CharErrorMap)
          .GroupBy(kvp => kvp.Key)
          .ToDictionary(
              group => group.Key,
              group => group.Sum(kvp => kvp.Value)
          );


      // request body statistics for gemini api
      var requestBodyStatistics = new FeedbackStatisticsDTO
      {
        // error maps
        WordErrorMap = combinedWordErrorMap,
        CharErrorMap = combinedCharErrorMap,

        // performance metrics
        PerformanceMetrics = new PerformanceMetricsDTO
        {
          TotalDrills = drills.Count,
          TotalWords = drills.Sum(d => d.Statistics.WordsCount),
          TotalLetters = drills.Sum(d => d.Statistics.LettersCount),
          TotalDuration = drills.Sum(d => d.Statistics.Duration),
          TotalCorrections = drills.Sum(d => d.Statistics.Corrections),

          // averages
          AverageWPM = drills.Any() ? drills.Average(d => d.Statistics.WPM) : 0,
          AverageAccuracy = drills.Any() ? drills.Average(d => d.Statistics.Accuracy) : 0,
          AverageErrorRate = drills.Any() ? drills.Average(d => d.Statistics.ErrorRate) : 0,

          // best performances
          MaxWPM = drills.Any() ? drills.Max(d => d.Statistics.MaxWPM) : 0,
          MaxAccuracy = drills.Any() ? drills.Max(d => d.Statistics.MaxAccuracy) : 0,

          // totals
          TotalCorrectWords = drills.Sum(d => d.Statistics.CorrectWords),
          TotalIncorrectWords = drills.Sum(d => d.Statistics.IncorrectWords),
          TotalCorrectLetters = drills.Sum(d => d.Statistics.CorrectLetters),
          TotalIncorrectLetters = drills.Sum(d => d.Statistics.IncorrectLetters)
        },

        // drill type analysis
        DrillTypeAnalysis = drills
              .GroupBy(d => d.DrillType)
              .Select(g => new DrillTypeAnalysisDTO
              {
                DrillType = g.Key.ToString(),
                Count = g.Count(),
                AverageWPM = g.Average(d => d.Statistics.WPM),
                AverageAccuracy = g.Average(d => d.Statistics.Accuracy),
                TotalErrors = g.Sum(d => d.Statistics.IncorrectWords + d.Statistics.IncorrectLetters)
              })
              .ToList(),

        // difficulty analysis
        DifficultyAnalysis = drills
              .Where(d => d.DrillDifficulty.HasValue)
              .GroupBy(d => d.DrillDifficulty)
              .Select(g => new DifficultyAnalysisDTO
              {
                Difficulty = g.Key?.ToString() ?? "Unknown",
                Count = g.Count(),
                AverageWPM = g.Average(d => d.Statistics.WPM),
                AverageAccuracy = g.Average(d => d.Statistics.Accuracy),
                TotalErrors = g.Sum(d => d.Statistics.IncorrectWords + d.Statistics.IncorrectLetters)
              })
              .ToList(),

        // time-based analysis (last 30 days vs older)
        TimeAnalysis = new TimeAnalysisDTO
        {
          RecentDrills = drills.Where(d => d.CreatedAt >= DateTime.UtcNow.AddDays(-30)).Cast<object>().ToList(),
          OlderDrills = drills.Where(d => d.CreatedAt < DateTime.UtcNow.AddDays(-30)).Cast<object>().ToList(),
          RecentAverageWPM = drills.Where(d => d.CreatedAt >= DateTime.UtcNow.AddDays(-30)).Any()
                  ? drills.Where(d => d.CreatedAt >= DateTime.UtcNow.AddDays(-30)).Average(d => d.Statistics.WPM) : 0,
          RecentAverageAccuracy = drills.Where(d => d.CreatedAt >= DateTime.UtcNow.AddDays(-30)).Any()
                  ? drills.Where(d => d.CreatedAt >= DateTime.UtcNow.AddDays(-30)).Average(d => d.Statistics.Accuracy) : 0
        },

        // correction patterns
        CorrectionAnalysis = new CorrectionAnalysisDTO
        {
          AverageCorrectionsPerDrill = drills.Any() ? drills.Average(d => d.Statistics.Corrections) : 0,
          DrillsWithHighCorrections = drills.Count(d => d.Statistics.Corrections > 5),
          CorrectionRate = drills.Sum(d => d.Statistics.WordsCount) > 0
                  ? (double)drills.Sum(d => d.Statistics.Corrections) / drills.Sum(d => d.Statistics.WordsCount) * 100 : 0
        }
      };

      // get recent drills for detailed analysis
      var sortedRecentDrills = drills
          .OrderByDescending(d => d.CreatedAt)
          .Take(10)
          .ToList();

      var detailedData = new
      {
        // overall performance
        totalDrills = requestBodyStatistics.PerformanceMetrics.TotalDrills,
        averageWPM = Math.Round(requestBodyStatistics.PerformanceMetrics.AverageWPM, 1),
        averageAccuracy = Math.Round(requestBodyStatistics.PerformanceMetrics.AverageAccuracy, 1),
        maxWPM = requestBodyStatistics.PerformanceMetrics.MaxWPM,
        totalErrors = requestBodyStatistics.PerformanceMetrics.TotalIncorrectWords + requestBodyStatistics.PerformanceMetrics.TotalIncorrectLetters,

        // complete error maps (sorted by frequency)
        wordErrorMap = requestBodyStatistics.WordErrorMap
              .OrderByDescending(kvp => kvp.Value)
              .Take(50)
              .ToDictionary(kvp => kvp.Key, kvp => kvp.Value),
        charErrorMap = requestBodyStatistics.CharErrorMap
              .OrderByDescending(kvp => kvp.Value)
              .Take(30)
              .ToDictionary(kvp => kvp.Key, kvp => kvp.Value),

        // recent drill performance
        recentDrills = sortedRecentDrills.Select(d => new
        {
          date = d.CreatedAt.ToString("yyyy-MM-dd"),
          drillType = d.DrillType.ToString(),
          difficulty = d.DrillDifficulty?.ToString() ?? "Unknown",
          wpm = Math.Round(d.Statistics.WPM, 1),
          accuracy = Math.Round(d.Statistics.Accuracy, 1),
          errors = d.Statistics.IncorrectWords + d.Statistics.IncorrectLetters,
          corrections = d.Statistics.Corrections,
          wordErrors = d.Statistics.ErrorMap.WordErrorMap.Take(5).ToDictionary(kvp => kvp.Key, kvp => kvp.Value),
          charErrors = d.Statistics.ErrorMap.CharErrorMap.Take(5).ToDictionary(kvp => kvp.Key, kvp => kvp.Value)
        }).ToList(),

        // drill type performance
        drillTypes = requestBodyStatistics.DrillTypeAnalysis.Select(d => new
        {
          type = d.DrillType,
          count = d.Count,
          wpm = Math.Round(d.AverageWPM, 1),
          accuracy = Math.Round(d.AverageAccuracy, 1),
          totalErrors = d.TotalErrors
        }).ToList(),

        // time-based trends
        recentWPM = Math.Round(requestBodyStatistics.TimeAnalysis.RecentAverageWPM, 1),
        recentAccuracy = Math.Round(requestBodyStatistics.TimeAnalysis.RecentAverageAccuracy, 1),
        olderWPM = Math.Round(requestBodyStatistics.TimeAnalysis.RecentAverageWPM > 0 ?
              drills.Where(d => d.CreatedAt < DateTime.UtcNow.AddDays(-30)).Any() ?
              drills.Where(d => d.CreatedAt < DateTime.UtcNow.AddDays(-30)).Average(d => d.Statistics.WPM) : 0 : 0, 1),
        olderAccuracy = Math.Round(requestBodyStatistics.TimeAnalysis.RecentAverageAccuracy > 0 ?
              drills.Where(d => d.CreatedAt < DateTime.UtcNow.AddDays(-30)).Any() ?
              drills.Where(d => d.CreatedAt < DateTime.UtcNow.AddDays(-30)).Average(d => d.Statistics.Accuracy) : 0 : 0, 1),

        // correction patterns
        averageCorrections = Math.Round(requestBodyStatistics.CorrectionAnalysis.AverageCorrectionsPerDrill, 1),
        correctionRate = Math.Round(requestBodyStatistics.CorrectionAnalysis.CorrectionRate, 2)
      };

      return detailedData;
    }

    public async Task<AIFeedbackDTO> GetAIInsightsAsync(string userId)
    {
      var detailedData = await GetRequestStatisticsAsync(userId);

      // serialize the detailed data
      string jsonData = JsonSerializer.Serialize(detailedData);

      // insert data into the prompt
      string filledPrompt = prompt.Replace("_string_to_be_replaced_", jsonData);

      // construct the gemini json payload with enhanced structured output
      string requestBody = $@"
{{
  ""contents"": [
    {{
      ""parts"": [
        {{
          ""text"": ""{filledPrompt.Replace("\"", "\\\"")}""
        }}
      ]
    }}
  ],
  ""generationConfig"": {{
    ""responseMimeType"": ""application/json"",
    ""responseSchema"": {{
      ""type"": ""OBJECT"",
      ""properties"": {{
        ""performanceSummary"": {{
          ""type"": ""OBJECT"",
          ""properties"": {{
            ""overallLevel"": {{ ""type"": ""STRING"" }},
            ""currentWPM"": {{ ""type"": ""NUMBER"" }},
            ""currentAccuracy"": {{ ""type"": ""NUMBER"" }},
            ""totalDrills"": {{ ""type"": ""NUMBER"" }},
            ""trend"": {{ ""type"": ""STRING"" }},
            ""improvementNeeded"": {{ ""type"": ""STRING"" }}
          }},
          ""propertyOrdering"": [""overallLevel"", ""currentWPM"", ""currentAccuracy"", ""totalDrills"", ""trend"", ""improvementNeeded""]
        }},
        ""wordLevelAnalysis"": {{
          ""type"": ""OBJECT"",
          ""properties"": {{
            ""topErrorWords"": {{
              ""type"": ""ARRAY"",
              ""items"": {{
                ""type"": ""OBJECT"",
                ""properties"": {{
                  ""word"": {{ ""type"": ""STRING"" }},
                  ""errorCount"": {{ ""type"": ""NUMBER"" }},
                  ""pattern"": {{ ""type"": ""STRING"" }},
                  ""likelyCause"": {{ ""type"": ""STRING"" }},
                  ""similarWords"": {{
                    ""type"": ""ARRAY"",
                    ""items"": {{ ""type"": ""STRING"" }}
                  }}
                }},
                ""propertyOrdering"": [""word"", ""errorCount"", ""pattern"", ""likelyCause"", ""similarWords""]
              }}
            }},
            ""wordPatterns"": {{
              ""type"": ""ARRAY"",
              ""items"": {{
                ""type"": ""OBJECT"",
                ""properties"": {{
                  ""pattern"": {{ ""type"": ""STRING"" }},
                  ""description"": {{ ""type"": ""STRING"" }},
                  ""affectedWords"": {{
                    ""type"": ""ARRAY"",
                    ""items"": {{ ""type"": ""STRING"" }}
                  }},
                  ""frequency"": {{ ""type"": ""NUMBER"" }}
                }},
                ""propertyOrdering"": [""pattern"", ""description"", ""affectedWords"", ""frequency""]
              }}
            }}
          }},
          ""propertyOrdering"": [""topErrorWords"", ""wordPatterns""]
        }},
        ""characterLevelAnalysis"": {{
          ""type"": ""OBJECT"",
          ""properties"": {{
            ""topErrorChars"": {{
              ""type"": ""ARRAY"",
              ""items"": {{
                ""type"": ""OBJECT"",
                ""properties"": {{
                  ""character"": {{ ""type"": ""STRING"" }},
                  ""errorCount"": {{ ""type"": ""NUMBER"" }},
                  ""keyboardZone"": {{ ""type"": ""STRING"" }},
                  ""finger"": {{ ""type"": ""STRING"" }},
                  ""commonMistakes"": {{
                    ""type"": ""ARRAY"",
                    ""items"": {{ ""type"": ""STRING"" }}
                  }}
                }},
                ""propertyOrdering"": [""character"", ""errorCount"", ""keyboardZone"", ""finger"", ""commonMistakes""]
              }}
            }},
            ""keyboardWeaknesses"": {{
              ""type"": ""ARRAY"",
              ""items"": {{
                ""type"": ""OBJECT"",
                ""properties"": {{
                  ""zone"": {{ ""type"": ""STRING"" }},
                  ""description"": {{ ""type"": ""STRING"" }},
                  ""errorRate"": {{ ""type"": ""NUMBER"" }},
                  ""affectedChars"": {{
                    ""type"": ""ARRAY"",
                    ""items"": {{ ""type"": ""STRING"" }}
                  }}
                }},
                ""propertyOrdering"": [""zone"", ""description"", ""errorRate"", ""affectedChars""]
              }}
            }}
          }},
          ""propertyOrdering"": [""topErrorChars"", ""keyboardWeaknesses""]
        }},
        ""recentTrends"": {{
          ""type"": ""OBJECT"",
          ""properties"": {{
            ""wpmTrend"": {{ ""type"": ""STRING"" }},
            ""accuracyTrend"": {{ ""type"": ""STRING"" }},
            ""errorPatterns"": {{
              ""type"": ""ARRAY"",
              ""items"": {{ ""type"": ""STRING"" }}
            }},
            ""improvingAreas"": {{
              ""type"": ""ARRAY"",
              ""items"": {{ ""type"": ""STRING"" }}
            }},
            ""decliningAreas"": {{
              ""type"": ""ARRAY"",
              ""items"": {{ ""type"": ""STRING"" }}
            }}
          }},
          ""propertyOrdering"": [""wpmTrend"", ""accuracyTrend"", ""errorPatterns"", ""improvingAreas"", ""decliningAreas""]
        }},
        ""immediateActions"": {{
          ""type"": ""OBJECT"",
          ""properties"": {{
            ""criticalIssues"": {{
              ""type"": ""ARRAY"",
              ""items"": {{ ""type"": ""STRING"" }}
            }},
            ""quickFixes"": {{
              ""type"": ""ARRAY"",
              ""items"": {{ ""type"": ""STRING"" }}
            }},
            ""nextDrillFocus"": {{
              ""type"": ""ARRAY"",
              ""items"": {{ ""type"": ""STRING"" }}
            }}
          }},
          ""propertyOrdering"": [""criticalIssues"", ""quickFixes"", ""nextDrillFocus""]
        }}
      }},
      ""propertyOrdering"": [""performanceSummary"", ""wordLevelAnalysis"", ""characterLevelAnalysis"", ""recentTrends"", ""immediateActions""]
    }}
  }}
}}";

      // send the http request
      var request = new HttpRequestMessage(HttpMethod.Post, GEMINI_API_URL);
      request.Headers.Add("x-goog-api-key", GEMINI_API_KEY);
      request.Content = new StringContent(requestBody);
      request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

      HttpResponseMessage response = await _httpClient.SendAsync(request);
      response.EnsureSuccessStatusCode();

      string responseBody = await response.Content.ReadAsStringAsync();

      // parse the gemini response to extract the actual json content
      using var document = JsonDocument.Parse(responseBody);
      var candidates = document.RootElement.GetProperty("candidates");
      var firstCandidate = candidates[0];
      var content = firstCandidate.GetProperty("content");
      var parts = content.GetProperty("parts");
      var firstPart = parts[0];
      var text = firstPart.GetProperty("text").GetString();

      if (string.IsNullOrEmpty(text))
      {
        throw new InvalidOperationException("Invalid response format from Gemini API - no text content found");
      }

      // deserialize the JSON text into our DTO
      var aiFeedback = JsonSerializer.Deserialize<AIFeedbackDTO>(text);

      if (aiFeedback == null)
      {
        throw new InvalidOperationException("Failed to deserialize AI feedback response");
      }

      // validate and ensure all required sections exist
      aiFeedback = ValidateAndFixAIFeedback(aiFeedback);

      // save the ai feedback to the profile
      await _profileService.SaveAiInsightAsync(userId, aiFeedback);

      return aiFeedback;
    }

    private AIFeedbackDTO ValidateAndFixAIFeedback(AIFeedbackDTO feedback)
    {
      // ensure all sections exist
      feedback.PerformanceSummary ??= new PerformanceSummaryDTO();
      feedback.WordLevelAnalysis ??= new WordLevelAnalysisDTO();
      feedback.CharacterLevelAnalysis ??= new CharacterLevelAnalysisDTO();
      feedback.RecentTrends ??= new RecentTrendsDTO();
      feedback.ImmediateActions ??= new ImmediateActionsDTO();

      // ensure collections are initialized
      feedback.WordLevelAnalysis.TopErrorWords ??= new List<ErrorWordDTO>();
      feedback.WordLevelAnalysis.WordPatterns ??= new List<WordPatternDTO>();
      feedback.CharacterLevelAnalysis.TopErrorChars ??= new List<ErrorCharDTO>();
      feedback.CharacterLevelAnalysis.KeyboardWeaknesses ??= new List<KeyboardWeaknessDTO>();
      feedback.RecentTrends.ErrorPatterns ??= new List<string>();
      feedback.RecentTrends.ImprovingAreas ??= new List<string>();
      feedback.RecentTrends.DecliningAreas ??= new List<string>();
      feedback.ImmediateActions.CriticalIssues ??= new List<string>();
      feedback.ImmediateActions.QuickFixes ??= new List<string>();
      feedback.ImmediateActions.NextDrillFocus ??= new List<string>();

      // validate and fix performance summary
      if (string.IsNullOrEmpty(feedback.PerformanceSummary.OverallLevel))
      {
        feedback.PerformanceSummary.OverallLevel = "Unknown";
      }

      // ensure immediateActions has content (fallback to generated recommendations)
      if (feedback.ImmediateActions.CriticalIssues.Count == 0 || 
          feedback.ImmediateActions.QuickFixes.Count == 0 || 
          feedback.ImmediateActions.NextDrillFocus.Count == 0)
      {
        feedback.ImmediateActions = GenerateDefaultImmediateActions(feedback);
      }

      return feedback;
    }

    private ImmediateActionsDTO GenerateDefaultImmediateActions(AIFeedbackDTO feedback)
    {
      var actions = new ImmediateActionsDTO();

      // generate critical issues based on analysis
      if (feedback.CharacterLevelAnalysis.TopErrorChars.Any())
      {
        var topChar = feedback.CharacterLevelAnalysis.TopErrorChars.First();
        actions.CriticalIssues.Add($"High error rate on '{topChar.Character}' character ({topChar.ErrorCount} errors) - {topChar.KeyboardZone} zone needs attention");
      }

      if (feedback.WordLevelAnalysis.TopErrorWords.Any())
      {
        var topWord = feedback.WordLevelAnalysis.TopErrorWords.First();
        actions.CriticalIssues.Add($"Frequent errors on word '{topWord.Word}' ({topWord.ErrorCount} times) - {topWord.Pattern} pattern needs practice");
      }

      if (feedback.PerformanceSummary.CurrentAccuracy < 95)
      {
        actions.CriticalIssues.Add($"Accuracy below 95% ({feedback.PerformanceSummary.CurrentAccuracy}%) - focus on precision over speed");
      }

      // generate quick fixes
      actions.QuickFixes.Add("Practice spacebar timing with rhythm drills to improve word separation");
      actions.QuickFixes.Add("Slow down on complex words and focus on accuracy over speed");
      actions.QuickFixes.Add("Use adaptive drills targeting your most error-prone words");

      // generate next drill focus
      if (feedback.WordLevelAnalysis.TopErrorWords.Any())
      {
        var topWords = feedback.WordLevelAnalysis.TopErrorWords.Take(3).Select(w => w.Word);
        actions.NextDrillFocus.Add($"Adaptive drills with words: {string.Join(", ", topWords)}");
      }

      actions.NextDrillFocus.Add("Character-specific drills for high-error characters");
      actions.NextDrillFocus.Add("Accuracy-focused drills at 80% of your current speed");

      return actions;
    }

    public async Task<(bool CanGenerate, string? Reason)> CanGenerateFeedbackAsync(string userId)
    {
      // get user data
      var user = await _userService.GetByUserId(userId);
      if (user == null)
        return (false, "User not found");

      Console.WriteLine("Generated today: " + user.AiInsightsGeneratedToday);
      Console.WriteLine("Max per day: " + user.MaxAiInsightsPerDay);

      // get profile data
      var profile = await _profileService.GetByUserId(userId);
      if (profile == null)
        return (false, "Profile not found");

      // check if user has enough drill data to generate insights
      var drills = await _drillService.GetAllDrillsAsync(userId);
      if (drills == null || drills.Count == 0)
        return (false, "Insufficient data: No drills completed yet");

      // check if user has enough recent data (at least 3 drills in the last 30 days)
      var recentDrills = drills.Where(d => d.CreatedAt >= DateTime.UtcNow.AddDays(-30)).ToList();
      if (recentDrills.Count < 3) // change to user.maxAiCall
        return (false, $"Insufficient data: Only {recentDrills.Count} drills completed in the last 30 days. Need at least 3 drills to generate meaningful insights.");

      var now = DateTime.UtcNow;

      // first time generating insights
      if (profile.AiInsightDetails == null)
        return (true, null);

      var lastGenerated = profile.AiInsightDetails.LastGeneratedAt;

      // check if 24 hours have passed since last generation
      var hoursSinceLastGeneration = (now - lastGenerated).TotalHours;
      
      // if more than 24 hours have passed, reset the counter
      if (hoursSinceLastGeneration >= 24)
      {
        // reset the daily counter
        var filter = Builders<Profile>.Filter.Eq(p => p.ProfileId, userId);
        var update = Builders<Profile>.Update
          .Set(p => p.AiInsightDetails.LastGeneratedAt, now)
          .Set("ai_insights_generated_today", 0);

        await _profiles.UpdateOneAsync(filter, update);
        
        // update local user object
        user.AiInsightsGeneratedToday = 0;
      }

      Console.WriteLine("Generated today: " + user.AiInsightsGeneratedToday);
      Console.WriteLine("Max per day: " + user.MaxAiInsightsPerDay);
      Console.WriteLine("Hours since last generation: " + hoursSinceLastGeneration);

      // check if user has reached their daily limit
      if (user.AiInsightsGeneratedToday >= user.MaxAiInsightsPerDay)
      {
        var nextResetTime = lastGenerated.AddHours(24);
        var timeUntilReset = nextResetTime - now;
        var hoursUntilReset = Math.Ceiling(timeUntilReset.TotalHours);
        
        return (false, $"Daily limit reached: You've generated {user.AiInsightsGeneratedToday}/{user.MaxAiInsightsPerDay} AI insights today. Limit resets in approximately {hoursUntilReset} hours.");
      }

      return (true, null);
    }

    public async Task IncrementAiInsightsCounterAsync(string userId)
    {
      // increment the daily counter
      var filter = Builders<User>.Filter.Eq(u => u.UserId, userId);
      var update = Builders<User>.Update.Inc(u => u.AiInsightsGeneratedToday, 1);

      await _users.UpdateOneAsync(filter, update);

      // update the profile's last generated timestamp
      var profileFilter = Builders<Profile>.Filter.Eq(p => p.ProfileId, userId);
      var profileUpdate = Builders<Profile>.Update
        .Set(p => p.AiInsightDetails.LastGeneratedAt, DateTime.UtcNow);

      await _profiles.UpdateOneAsync(profileFilter, profileUpdate);
    }
  }
}