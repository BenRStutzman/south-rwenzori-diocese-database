namespace SrdDatabase.Models.Reports
{
    public class TransactionRow
    {
        public string Date { get; }

        public string Description { get; }

        public int? ReceiptNumber { get; }

        public int Amount { get; }

        public TransactionRow(
            string date,
            string description,
            int amount,
            int? receiptNumber = null)
        {
            Date = date;
            Description = description;
            Amount = amount;
            ReceiptNumber = receiptNumber;
        }
    }
}
