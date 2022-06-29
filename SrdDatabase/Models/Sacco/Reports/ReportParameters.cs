using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Reports
{
    public class ReportParameters
    {
        [Range(1, int.MaxValue)]
        public int MemberId { get; }

        public DateTime? StartDate { get; }

        public DateTime? EndDate { get; }

        public ReportParameters(
            int memberId,
            DateTime? startDate = null,
            DateTime? endDate = null)
        {
            MemberId = memberId;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
