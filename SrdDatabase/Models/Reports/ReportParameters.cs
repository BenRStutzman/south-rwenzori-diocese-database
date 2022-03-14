using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Reports
{
    public class ReportParameters
    {
        [Range(1, int.MaxValue)]
        public int? ArchdeaconryId { get; }

        [Range(1, int.MaxValue)]
        public int? ParishId { get; }

        [Range(1, int.MaxValue)]
        public int? CongregationId { get; }

        public DateTime? StartDate { get; }

        public DateTime? EndDate { get; }

        public ReportParameters(
            int? archdeaconryId = null,
            int? parishId = null,
            int? congregationId = null,
            DateTime? startDate = null,
            DateTime? endDate = null)
        {
            ArchdeaconryId = archdeaconryId;
            ParishId = parishId;
            CongregationId = congregationId;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
