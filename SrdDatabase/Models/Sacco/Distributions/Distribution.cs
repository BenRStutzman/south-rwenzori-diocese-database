using System;

namespace SrdDatabase.Models.Sacco.Distributions
{
    public class Distribution
    {
        public int Id { get; }

        public DateTime Date { get; }

        public decimal DividendPercentage { get; }

        public decimal InterestPercentage { get; }

        public int TotalDividend { get; }

        public int TotalInterest { get; }

        public int TotalDistributed { get; }

        public Distribution(
            int id,
            DateTime date,
            decimal dividendPercentage,
            decimal interestPercentage,
            int totalDividend,
            int totalInterest,
            int totalDistributed)
        {
            Id = id;
            Date = date;
            DividendPercentage = dividendPercentage;
            InterestPercentage = interestPercentage;
            TotalDividend = totalDividend;
            TotalInterest = totalInterest;
            TotalDistributed = totalDistributed;
        }

        // for Dapper
        public Distribution()
        {
        }
    }
}
