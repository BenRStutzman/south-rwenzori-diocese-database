using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Quotas
{
    public class QuotaParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [Range(1, int.MaxValue)]
        public int? ArchdeaconryId { get; }

        [Range(1, int.MaxValue)]
        public int? ParishId { get; }

        [Range(1, int.MaxValue)]
        public int? CongregationId { get; }

        [Range(1, int.MaxValue)]
        public int? StartYear { get; }

        [Range(1, int.MaxValue)]
        public int? EndYear { get; }

        public QuotaParameters(
            int? archdeaconryId = null,
            int? parishId = null,
            int? congregationId = null,
            int? startYear = null,
            int? endYear = null,
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
            ArchdeaconryId = archdeaconryId;
            ParishId = parishId;
            CongregationId = congregationId;
            StartYear = startYear;
            EndYear = endYear;
        }
    }
}
