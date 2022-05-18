using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Censuses
{
    public class CensusFields : FieldsWithUserId
    {
        [Range(1, int.MaxValue)]
        public int CongregationId { get; }

        [Range(1, int.MaxValue)]
        public int Males0To12 { get; }

        [Range(1, int.MaxValue)]
        public int Females0To12 { get; }

        [Range(1, int.MaxValue)]
        public int Males13To17 { get; }

        [Range(1, int.MaxValue)]
        public int Females13To17 { get; }

        [Range(1, int.MaxValue)]
        public int Males18To35 { get; }

        [Range(1, int.MaxValue)]
        public int Females18To35 { get; }

        [Range(1, int.MaxValue)]
        public int Males36AndAbove { get; }

        [Range(1, int.MaxValue)]
        public int Females36AndAbove { get; }

        [Required]
        public DateTime Date { get; }

        public CensusFields(
            int males0To12,
            int females0To12,
            int males13To17,
            int females13To17,
            int males18To35,
            int females18To35,
            int males36AndAbove,
            int females36AndAbove,
            int congregationId,
            DateTime date,
            int? userId = null) : base(userId)
        {
            Males0To12 = males0To12;
            Females0To12 = females0To12;
            Males13To17 = males13To17;
            Females13To17 = females13To17;
            Males18To35 = males18To35;
            Females18To35 = females18To35;
            Males36AndAbove = males36AndAbove;
            Females36AndAbove = females36AndAbove;
            Date = date;
            CongregationId = congregationId;
        }
    }
}
