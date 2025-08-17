using MongoDB.Driver;
using server.Data.Mongo;
using server.Entities;
using server.Services.Interfaces;

namespace server.Services
{
	public class BookService : IBookService
	{
		private readonly IMongoCollection<Book> _books;

		public BookService(MongoDbContext context)
		{
			_books = context.Books;
		}

		public async Task<List<Book>> GetAllBooksAsync(int page = 1, int pageSize = 10)
		{
			var skip = (page - 1) * pageSize;
			return await _books.Find(_ => true)
				.Skip(skip)
				.Limit(pageSize)
				.ToListAsync();
		}

		public async Task<Book?> GetBookByIdAsync(string bookId)
		{
			var filter = Builders<Book>.Filter.Eq(b => b.Id, bookId);
			return await _books.Find(filter).FirstOrDefaultAsync();
		}

		public async Task<List<Book>> GetBooksByIdsAsync(List<string> bookIds)
		{
			if (bookIds == null || !bookIds.Any())
				return new List<Book>();

			var filter = Builders<Book>.Filter.In(b => b.Id, bookIds);
			return await _books.Find(filter).ToListAsync();
		}

		public async Task<int> GetTotalBooksCountAsync()
		{
			return (int)await _books.CountDocumentsAsync(_ => true);
		}

		public async Task<Book> CreateBookAsync(Book book)
		{
			await _books.InsertOneAsync(book);
			return book;
		}
	}
}
