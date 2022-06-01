using System;

namespace SrdDatabase.Models.Sacco.Distributions
{
    public class DistributionApplied
    {
        public int DistributionId { get; }

        public DateTime Date { get; }

        public decimal Percentage { get; }

        public int Amount { get; }

        public DistributionApplied(
            int distributionId,
            DateTime date,
            decimal percentage,
            int amount)
        {
            DistributionId = distributionId;
            Date = date;
            Percentage = percentage;
            Amount = amount;
        }

        // for Dapper
        public DistributionApplied()
        {
        }
    }
}
