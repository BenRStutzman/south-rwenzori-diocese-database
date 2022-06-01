using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Distributions
{
    public class DistributionFields : FieldsWithUserId
    {
        [Required]
        public DateTime Date { get; }

        [Range(0, 100)]
        public decimal Percentage { get; }

        public DistributionFields(
            decimal percentage,
            DateTime date,
            int? userId = null) : base(userId)
        {
            Percentage = percentage;
            Date = date;
        }
    }
}
