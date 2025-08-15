using server.Entities;

namespace server.Services.Interfaces
{
	public interface IBookService
	{
		Task<List<Book>> GetAllBooksAsync(int page = 1, int pageSize = 10);
		Task<Book?> GetBookByIdAsync(string bookId);
		Task<int> GetTotalBooksCountAsync();
		Task<Book> CreateBookAsync(Book book);
	}
}
