using System;

namespace SrdDatabase.Models.Sacco.Distributions
{
    public class Distribution
    {
        public int Id { get; }

        public DateTime Date { get; }

        public decimal Percentage { get; }

        public Distribution(
            int id,
            DateTime date,
            decimal percentage)
        {
            Id = id;
            Date = date;
            Percentage = percentage;
        }

        // for Dapper
        public Distribution()
        {
        }
    }
}
