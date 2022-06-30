using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Distributions
{
    public class DistributionAppliedParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int MemberId { get; }

        public DateTime? StartDate { get; }

        public DateTime? EndDate { get; }

        public DistributionAppliedParameters(
            int memberId,
            DateTime? startDate,
            DateTime? endDate,
            int pageNumber = 0,
            int? pageSize = null) : base(
                pageNumber,
                null,
                false,
                pageSize)
        {
            MemberId = memberId;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
