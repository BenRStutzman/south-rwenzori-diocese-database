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
        public decimal DividendPercentage { get; }

        public decimal InterestPercentage { get; }

        public DistributionFields(
            decimal dividendPercentage,
            decimal interestPercentage,
            DateTime date,
            int? userId = null) : base(userId)
        {
            DividendPercentage = dividendPercentage;
            InterestPercentage = interestPercentage;
            Date = date;
        }
    }
}
