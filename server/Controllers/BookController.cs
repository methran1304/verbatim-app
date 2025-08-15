using Microsoft.AspNetCore.Mvc;
using server.Entities;
using server.Models;
using server.Services.Interfaces;

namespace server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class BookController : ControllerBase
	{
		private readonly IBookService _bookService;

		public BookController(IBookService bookService)
		{
			_bookService = bookService;
		}

		/// <summary>
		/// Get all books with pagination
		/// </summary>
		/// <param name="page">Page number (default: 1)</param>
		/// <param name="pageSize">Number of books per page (default: 10)</param>
		/// <returns>Paginated list of books</returns>
		[HttpGet]
		public async Task<ActionResult<PaginationResult<Book>>> GetBooks([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
		{
			try
			{
				var books = await _bookService.GetAllBooksAsync(page, pageSize);
				var totalCount = await _bookService.GetTotalBooksCountAsync();

				var paginationResult = new PaginationResult<Book>(books, totalCount, page, pageSize);
				return Ok(paginationResult);
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { error = "Failed to retrieve books", message = ex.Message });
			}
		}

		/// <summary>
		/// Get a specific book by ID
		/// </summary>
		/// <param name="id">Book ID</param>
		/// <returns>Book details</returns>
		[HttpGet("{id}")]
		public async Task<ActionResult<Book>> GetBookById(string id)
		{
			try
			{
				var book = await _bookService.GetBookByIdAsync(id);
				
				if (book == null)
				{
					return NotFound(new { error = "Book not found" });
				}

				return Ok(book);
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { error = "Failed to retrieve book", message = ex.Message });
			}
		}
	}
}
