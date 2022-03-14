namespace SrdDatabase.Models.Reports
{
    public class TransactionRow
    {
        public string Date { get; }

        public string Description { get; }

        public int Amount { get; }

        public TransactionRow(string date, string description, int amount)
        {
            Date = date;
            Description = description;
            Amount = amount;
        }
    }
}
