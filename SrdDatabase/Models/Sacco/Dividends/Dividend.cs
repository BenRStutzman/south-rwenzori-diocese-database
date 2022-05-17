using System;

namespace SrdDatabase.Models.Sacco.Dividends
{
    public class Dividend
    {
        public int Id { get; }

        public DateTime Date { get; }

        public decimal Percentage { get; }

        public Dividend(
            int id,
            DateTime date,
            decimal percentage)
        {
            Id = id;
            Date = date;
            Percentage = percentage;
        }

        // for Dapper
        public Dividend()
        {
        }
    }
}
