using System;

namespace SrdDatabase.Models.Sacco.Reports
{
    public class TransactionRow
    {
        public DateTime Date { get; }

        public string Description { get; }

        public int? Shares { get; }

        public int? Savings { get; }

        public sbyte Order { get; }

        public TransactionRow(
            DateTime date,
            string description,
            int? shares,
            int? savings,
            sbyte order)
        {
            Date = date;
            Description = description;
            Shares = shares;
            Savings = savings;
            Order = order;
        }
    }
}
