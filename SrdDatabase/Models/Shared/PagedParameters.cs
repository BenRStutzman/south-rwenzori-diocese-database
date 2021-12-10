using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Shared
{
    public class PagedParameters
    {
        [Range(0, int.MaxValue)]
        public int PageNumber { get; }

        [Range(1, int.MaxValue)]
        public int? PageSize { get; }

        public PagedParameters(int pageNumber = 0, int? pageSize = null)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
    }
}
