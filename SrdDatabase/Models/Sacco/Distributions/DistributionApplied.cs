using System;

namespace SrdDatabase.Models.Sacco.Distributions
{
    public class DistributionApplied
    {
        public int DistributionId { get; }

        public DateTime Date { get; }

        public decimal DividendPercentage { get; }

        public decimal InterestPercentage { get; }

        public int Dividend { get; }

        public int Interest { get; }

        public DistributionApplied(
            int distributionId,
            DateTime date,
            decimal dividendPercentage,
            decimal interestPercentage,
            int dividend,
            int interest)
        {
            DistributionId = distributionId;
            Date = date;
            DividendPercentage = dividendPercentage;
            InterestPercentage = interestPercentage;
            Dividend = dividend;
            Interest = interest;
        }

        // for Dapper
        public DistributionApplied()
        {
        }
    }
}
