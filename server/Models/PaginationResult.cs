namespace server.Models
{
	public class PaginationResult<T>
	{
		public List<T> Items { get; set; } = new();
		public int Total { get; set; }
		public int Page { get; set; }
		public int PageSize { get; set; }
		public int TotalPages { get; set; }
		public bool HasNextPage { get; set; }
		public bool HasPreviousPage { get; set; }

		public PaginationResult(List<T> items, int total, int page, int pageSize)
		{
			Items = items;
			Total = total;
			Page = page;
			PageSize = pageSize;
			TotalPages = (int)Math.Ceiling((double)total / pageSize);
			HasNextPage = page < TotalPages;
			HasPreviousPage = page > 1;
		}
	}
}
