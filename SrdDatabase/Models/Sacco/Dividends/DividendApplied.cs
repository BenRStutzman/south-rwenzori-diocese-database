using System;

namespace SrdDatabase.Models.Sacco.Dividends
{
    public class DividendApplied
    {
        public int DividendId { get; }

        public DateTime Date { get; }

        public decimal Percentage { get; }

        public int Amount { get; }

        public DividendApplied(
            int dividendId,
            DateTime date,
            decimal percentage,
            int amount)
        {
            DividendId = dividendId;
            Date = date;
            Percentage = percentage;
            Amount = amount;
        }

        // for Dapper
        public DividendApplied()
        {
        }
    }
}
