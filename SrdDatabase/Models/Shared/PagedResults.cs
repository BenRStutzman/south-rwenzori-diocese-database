namespace SrdDatabase.Models.Shared
{
    public class PagedResults
    {
        public int PageNumber { get; }

        public int? PageSize { get; }

        public int TotalResults { get; }

        public PagedResults(
            int pageNumber,
            int? pageSize,
            int totalResults)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalResults = totalResults;
        }
    }
}
