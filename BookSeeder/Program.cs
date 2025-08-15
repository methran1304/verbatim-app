using System;
using System.Text;
using HtmlAgilityPack;
using VersOne.Epub;
using server.Entities;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;

namespace BookSeederTool
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("=== Book Seeder - Processing Local EPUB Files ===");
            Console.WriteLine("Reading from BooksRepo directory and populating database...");
            Console.WriteLine();

            try
            {
                // setup mongodb connection
                var connectionString = "mongodb://localhost:27017";
                var databaseName = "verbatim";
                var client = new MongoClient(connectionString);
                var database = client.GetDatabase(databaseName);
                var booksCollection = database.GetCollection<Book>("books");

                // clear existing books
                var filter = Builders<Book>.Filter.Empty;
                await booksCollection.DeleteManyAsync(filter);
                Console.WriteLine("Cleared existing books from database.");
                Console.WriteLine();

                // process all epub files in booksrepo
                var booksRepoPath = "/Users/methran/core/projects/verbatim/server/Constants/BooksRepo";
                var epubFiles = Directory.GetFiles(booksRepoPath, "*.epub");

                Console.WriteLine($"Found {epubFiles.Length} EPUB files to process:");
                Console.WriteLine();

                int processedCount = 0;
                int successCount = 0;

                foreach (var epubFile in epubFiles)
                {
                    try
                    {
                        Console.WriteLine($"Processing: {Path.GetFileName(epubFile)}");
                        
                        var book = await ProcessEpubFile(epubFile);
                        if (book != null)
                        {
                            await booksCollection.InsertOneAsync(book);
                            successCount++;
                            Console.WriteLine($"✓ Successfully added: {book.Title}");
                        }
                        else
                        {
                            Console.WriteLine($"✗ Failed to process: {Path.GetFileName(epubFile)}");
                        }
                        
                        processedCount++;
                        Console.WriteLine();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"✗ Error processing {Path.GetFileName(epubFile)}: {ex.Message}");
                        Console.WriteLine();
                    }
                }

                Console.WriteLine("=== Seeding Complete ===");
                Console.WriteLine($"Processed: {processedCount} files");
                Console.WriteLine($"Successfully added: {successCount} books");
                Console.WriteLine($"Failed: {processedCount - successCount} files");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during seeding: {ex.Message}");
            }
        }

        private static async Task<Book?> ProcessEpubFile(string epubFilePath)
        {
            try
            {
                var epubBook = await Task.Run(() => EpubReader.ReadBook(epubFilePath));
                
                // extract book info from filename
                var fileName = Path.GetFileNameWithoutExtension(epubFilePath);
                var bookInfo = ParseBookInfoFromFileName(fileName);
                
                if (bookInfo == null)
                {
                    Console.WriteLine($"Could not parse book info from filename: {fileName}");
                    return null;
                }

                // process content by chapters
                var content = ProcessBookByChapters(epubBook);
                
                // Extract metadata
                var publishedYear = ExtractPublishedYear(epubBook.Description);
                var coverImage = ExtractCoverImage(epubBook);
                var genre = DetermineGenre(bookInfo.Author, bookInfo.Title);
                
                // Create book entity
                var book = new Book
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Title = bookInfo.Title,
                    Author = bookInfo.Author,
                    Content = content,
                    TotalWordCount = CountWords(content),
                    Genre = genre,
                    PublishedYear = publishedYear,
                    CoverImage = coverImage,
                    Description = epubBook.Description ?? string.Empty
                };

                return book;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing EPUB file: {ex.Message}");
                return null;
            }
        }

        private static BookInfo? ParseBookInfoFromFileName(string fileName)
        {
            // Remove common suffixes and clean up the filename
            var cleanFileName = fileName
                .Replace("_", " ")
                .Replace("-", " ")
                .Replace(".epub", "")
                .Trim();

            // Try to extract author and title
            // Common pattern: "Author - Title" or "Title by Author"
            var parts = cleanFileName.Split(new[] { " by ", " - " }, StringSplitOptions.RemoveEmptyEntries);
            
            if (parts.Length >= 2)
            {
                var author = parts[1].Trim();
                var title = parts[0].Trim();
                
                return new BookInfo
                {
                    Title = title,
                    Author = author
                };
            }
            
            // If we can't parse it, just use the filename as title
            return new BookInfo
            {
                Title = cleanFileName,
                Author = "Unknown Author"
            };
        }

        private static string DetermineGenre(string author, string title)
        {
            // Simple genre determination based on author and title keywords
            var text = $"{author} {title}".ToLower();
            
            if (text.Contains("sherlock") || text.Contains("detective") || text.Contains("mystery"))
                return "Mystery";
            if (text.Contains("love") || text.Contains("romance") || text.Contains("passion"))
                return "Romance";
            if (text.Contains("adventure") || text.Contains("journey") || text.Contains("quest"))
                return "Adventure";
            if (text.Contains("war") || text.Contains("battle") || text.Contains("military"))
                return "War";
            if (text.Contains("philosophy") || text.Contains("philosophical"))
                return "Philosophy";
            if (text.Contains("science") || text.Contains("scientific"))
                return "Science";
            if (text.Contains("history") || text.Contains("historical"))
                return "History";
            if (text.Contains("fantasy") || text.Contains("magic"))
                return "Fantasy";
            if (text.Contains("horror") || text.Contains("ghost") || text.Contains("vampire"))
                return "Horror";
            if (text.Contains("comedy") || text.Contains("humor") || text.Contains("funny"))
                return "Comedy";
            
            return "Classic Literature";
        }

        private static string ProcessBookByChapters(EpubBook book)
        {
            StringBuilder fullContent = new StringBuilder();
            
            foreach (EpubLocalTextContentFile textContentFile in book.ReadingOrder)
            {
                // Skip non-chapter content
                if (IsChapterContent(textContentFile))
                {
                    string chapterContent = ExtractChapterContent(textContentFile);
                    fullContent.AppendLine(chapterContent);
                }
            }
            
            // Apply the same cleaning process as the frontend
            string rawContent = fullContent.ToString();
            string cleanedContent = CleanContentForDrill(rawContent);
            
            return cleanedContent;
        }

        private static string CleanContentForDrill(string content)
        {
            // Apply the same cleaning logic as the frontend drill-state-management.service.ts
            
            // 1. Normalize all newline characters to '↵'
            string normalizedContent = content
                .Replace("\r\n", "↵")  // Windows line endings
                .Replace("\r", "↵")    // Mac line endings (old)
                .Replace("\n", "↵")    // Unix line endings
                .Replace("↵↵", "↵");   // Normalize multiple consecutive line breaks to single
            
            // 2. Split by line breaks and process each line
            var lines = normalizedContent.Split('↵');
            var processedLines = new List<string>();
            
            foreach (var line in lines)
            {
                if (string.IsNullOrWhiteSpace(line))
                {
                    // Skip empty lines
                    continue;
                }
                
                // 3. Split line into words and clean each word
                var words = line.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
                var cleanedWords = new List<string>();
                
                foreach (var word in words)
                {
                    // Filter out punctuation and keep only alphanumeric characters
                    var cleanWord = System.Text.RegularExpressions.Regex.Replace(word, @"[^a-zA-Z0-9]", "");
                    
                    // Skip empty words after cleaning
                    if (!string.IsNullOrEmpty(cleanWord))
                    {
                        cleanedWords.Add(cleanWord);
                    }
                }
                
                // 4. Join cleaned words back together
                if (cleanedWords.Count > 0)
                {
                    processedLines.Add(string.Join(" ", cleanedWords));
                }
            }
            
            // 5. Join lines back together with '↵' separators
            return string.Join("↵", processedLines);
        }

        private static bool IsChapterContent(EpubLocalTextContentFile textContentFile)
        {
            var fileName = textContentFile.FilePath.ToLower();
            
            // Skip non-content files
            if (fileName.Contains("imprint") || 
                fileName.Contains("colophon") || 
                fileName.Contains("conclusion") ||
                fileName.Contains("endnotes") ||
                fileName.Contains("title") ||
                fileName.Contains("cover") ||
                fileName.Contains("toc") ||
                fileName.Contains("contents"))
            {
                return false;
            }
            
            return true;
        }

        private static string ExtractChapterContent(EpubLocalTextContentFile textContentFile)
        {
            var htmlContent = textContentFile.Content;
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(htmlContent);
            
            // Remove script and style elements
            var scriptElements = htmlDoc.DocumentNode.SelectNodes("//script");
            if (scriptElements != null)
            {
                foreach (var script in scriptElements)
                {
                    script.Remove();
                }
            }
            
            var styleElements = htmlDoc.DocumentNode.SelectNodes("//style");
            if (styleElements != null)
            {
                foreach (var style in styleElements)
                {
                    style.Remove();
                }
            }
            
            // Remove header elements (h1-h6) and elements with title/chapter classes
            var headerElements = htmlDoc.DocumentNode.SelectNodes("//h1|//h2|//h3|//h4|//h5|//h6");
            if (headerElements != null)
            {
                foreach (var header in headerElements)
                {
                    header.Remove();
                }
            }
            
            var titleElements = htmlDoc.DocumentNode.SelectNodes("//*[contains(@class, 'title') or contains(@class, 'chapter') or contains(@class, 'heading') or contains(@class, 'header')]");
            if (titleElements != null)
            {
                foreach (var titleElement in titleElements)
                {
                    titleElement.Remove();
                }
            }
            
            // Extract text content
            var textContent = htmlDoc.DocumentNode.InnerText;
            
            // Clean up whitespace
            textContent = System.Text.RegularExpressions.Regex.Replace(textContent, @"\s+", " ");
            
            return textContent.Trim();
        }

        private static int CountWords(string content)
        {
            if (string.IsNullOrWhiteSpace(content))
                return 0;
            
            var words = content.Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);
            return words.Length;
        }

        private static int? ExtractPublishedYear(string? description)
        {
            if (string.IsNullOrEmpty(description))
                return null;
            
            // Look for year patterns like (1900) or 1900 or published in 1900
            var yearMatch = System.Text.RegularExpressions.Regex.Match(description, @"\b(19|20)\d{2}\b");
            if (yearMatch.Success && int.TryParse(yearMatch.Value, out int year))
            {
                return year;
            }
            
            return null;
        }

        private static string ExtractCoverImage(EpubBook epubBook)
        {
            try
            {
                if (epubBook.CoverImage != null && epubBook.CoverImage.Length > 0)
                {
                    var imageData = epubBook.CoverImage;
                    var imageFormat = DetermineImageFormat(imageData);
                    var base64String = Convert.ToBase64String(imageData);
                    return $"data:{imageFormat};base64,{base64String}";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Warning: Could not extract cover image: {ex.Message}");
            }
            
            return string.Empty;
        }

        private static string DetermineImageFormat(byte[] imageData)
        {
            if (imageData.Length < 4)
                return "image/jpeg";
            
            // Check file signatures
            if (imageData[0] == 0xFF && imageData[1] == 0xD8 && imageData[2] == 0xFF)
                return "image/jpeg";
            if (imageData[0] == 0x89 && imageData[1] == 0x50 && imageData[2] == 0x4E && imageData[3] == 0x47)
                return "image/png";
            if (imageData[0] == 0x47 && imageData[1] == 0x49 && imageData[2] == 0x46)
                return "image/gif";
            if (imageData[0] == 0x42 && imageData[1] == 0x4D)
                return "image/bmp";
            
            return "image/jpeg"; // Default fallback
        }

        public class BookInfo
        {
            public string Title { get; set; } = string.Empty;
            public string Author { get; set; } = string.Empty;
        }
    }
}
