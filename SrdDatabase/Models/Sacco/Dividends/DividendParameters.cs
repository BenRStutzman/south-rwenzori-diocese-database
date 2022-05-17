using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Dividends
{
    public class DividendParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        public DateTime? StartDate { get; }

        public DateTime? EndDate { get; }

        public DividendParameters(
            DateTime? startDate = null,
            DateTime? endDate = null,
            int pageNumber = 0,
            string sortColumn = null,
            bool sortDescending = false,
            int? pageSize = null,
            int? id = null) : base(
                pageNumber,
                sortColumn,
                sortDescending,
                pageSize)
        {
            Id = id;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
