using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Censuses
{
    public class CensusFields : SaveFields
    {
        [Range(1, int.MaxValue)]
        public int CongregationId { get; }

        [Range(1, int.MaxValue)]
        public int NumberOfChristians { get; }

        [Required]
        public DateTime Date { get; }

        public CensusFields(
            int numberOfChristians,
            int congregationId,
            DateTime date,
            int? userId = null) : base(userId)
        {
            NumberOfChristians = numberOfChristians;
            Date = date;
            CongregationId = congregationId;
        }
    }
}
