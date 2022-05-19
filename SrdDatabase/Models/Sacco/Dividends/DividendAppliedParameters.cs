using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Dividends
{
    public class DividendAppliedParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int MemberId { get; }

        public DividendAppliedParameters(
            int memberId,
            int pageNumber = 0,
            int? pageSize = null) : base(
                pageNumber,
                null,
                false,
                pageSize)
        {
            MemberId = memberId;
        }
    }
}
