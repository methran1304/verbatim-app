using System;
using System.Text;
using HtmlAgilityPack;
using VersOne.Epub;
using server.Entities;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Text.RegularExpressions;

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
                var bookInfo = new BookInfo
                {
                    Title = epubBook.Title,
                    Author = epubBook.Author
                };
                
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
            
            // replace special characters with standard ASCII equivalents
            string normalizedSpecialChars = content
                // smart quotes
                .Replace("“", "\"")  // left double quotation mark → standard quote
                .Replace("”", "\"")  // right double quotation mark → standard quote
                .Replace("‘", "'")   // left single quotation mark → standard apostrophe
                .Replace("’", "'")   // right single quotation mark → standard apostrophe
                // em dashes and en dashes
                .Replace("—", "-")   // em dash → hyphen
                .Replace("–", "-")   // en dash → hyphen
                // other common special characters
                .Replace("…", "...") // ellipsis → three dots
                .Replace("•", "*")   // bullet point → asterisk
                .Replace("°", " degrees") // degree symbol → " degrees"
                .Replace("×", "x")   // multiplication sign → lowercase x
                .Replace("÷", "/")   // division sign → forward slash
                .Replace("±", "+/-") // plus-minus sign → "+/-"
                .Replace("≤", "<=")  // less than or equal → "<="
                .Replace("≥", ">=")  // greater than or equal → ">="
                .Replace("≠", "!=")  // not equal → "!="
                .Replace("≈", "~")   // approximately equal → tilde
                .Replace("∞", "infinity") // infinity symbol → "infinity"
                .Replace("√", "sqrt") // square root → "sqrt"
                .Replace("²", "^2")  // superscript 2 → "^2"
                .Replace("³", "^3"); // superscript 3 → "^3"
            
            // replace sentence endings with punctuation + newline for better paragraph breaks
            // only add line breaks after words that END with punctuation, don't break words
            string contentWithParagraphBreaks = normalizedSpecialChars
                .Replace(". ", ".\n")  // Replace ". " with ".\n" (remove space after period)
                .Replace("! ", "!\n")  // Replace "! " with "!\n" (remove space after exclamation)
                .Replace("? ", "?\n")  // Replace "? " with "?\n" (remove space after question)
                .Replace("; ", ";\n"); // Replace "; " with ";\n" (remove space after semicolon)
            
            // normalize all newline characters to '↵'
            string normalizedContent = contentWithParagraphBreaks
                .Replace("\r\n", "↵")  // windows line endings
                .Replace("\r", "↵")    // mac line endings (old)
                .Replace("\n", "↵")    // unix line endings
                .Replace("↵↵", "↵");   // normalize multiple consecutive line breaks to single
            
            // split by line breaks and process each line
            var lines = normalizedContent.Split('↵');
            var processedLines = new List<string>();
            
            foreach (var line in lines)
            {
                if (string.IsNullOrWhiteSpace(line))
                {
                    // skip empty lines
                    continue;
                }
                
                // split line into words and clean each word
                var words = line.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
                var cleanedWords = new List<string>();
                
                foreach (var word in words)
                {
                    // keep words as-is without removing punctuation
                    if (!string.IsNullOrEmpty(word))
                    {
                        cleanedWords.Add(word);
                    }
                }
                
                // join cleaned words back together
                if (cleanedWords.Count > 0)
                {
                    processedLines.Add(string.Join(" ", cleanedWords));
                }
            }
            
            // join lines back together with '↵' separators
            return string.Join("↵", processedLines);
        }

        private static bool IsChapterContent(EpubLocalTextContentFile textContentFile)
        {
            var fileName = textContentFile.FilePath.ToLower();
            
            // skip non-content files
            if (fileName.Contains("imprint") || 
                fileName.Contains("colophon") || 
                fileName.Contains("conclusion") ||
                fileName.Contains("endnotes") ||
                fileName.Contains("title") ||
                fileName.Contains("cover") ||
                fileName.Contains("toc") ||
                fileName.Contains("contents") ||
                fileName.Contains("preface"))
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
            
            // remove script and style elements
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
            
            // remove header elements (h1-h6) and elements with title/chapter classes
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
            
            // remove preface text if it appears in the content
            textContent = System.Text.RegularExpressions.Regex.Replace(textContent, @"^PREFACE\s*", "", RegexOptions.IgnoreCase);
            textContent = System.Text.RegularExpressions.Regex.Replace(textContent, @"^Preface\s*", "");
            
            // clean up whitespace
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
            
            // look for year patterns like (1900) or 1900 or published in 1900
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
            
            // check file signatures
            if (imageData[0] == 0xFF && imageData[1] == 0xD8 && imageData[2] == 0xFF)
                return "image/jpeg";
            if (imageData[0] == 0x89 && imageData[1] == 0x50 && imageData[2] == 0x4E && imageData[3] == 0x47)
                return "image/png";
            if (imageData[0] == 0x47 && imageData[1] == 0x49 && imageData[2] == 0x46)
                return "image/gif";
            if (imageData[0] == 0x42 && imageData[1] == 0x4D)
                return "image/bmp";
            
            return "image/jpeg"; // default fallback
        }

        public class BookInfo
        {
            public string Title { get; set; } = string.Empty;
            public string Author { get; set; } = string.Empty;
        }
    }
}
