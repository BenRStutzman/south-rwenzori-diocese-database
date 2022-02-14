using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Shared
{
    public class PagedParameters
    {
        [Range(0, int.MaxValue)]
        public int PageNumber { get; }

        [Range(1, int.MaxValue)]
        public int? PageSize { get; }

        public string SortColumn { get; }

        public bool SortDescending { get; }

        public PagedParameters(
            int pageNumber = 0,
            string sortColumn = null,
            bool sortDescending = false,
            int? pageSize = null)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            SortColumn = sortColumn;
            SortDescending = sortDescending;
        }
    }
}
