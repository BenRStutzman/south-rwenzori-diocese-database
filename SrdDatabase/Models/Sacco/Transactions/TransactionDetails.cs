namespace SrdDatabase.Models.Sacco.Transactions
{
    public class TransactionDetails
    {
        public Transaction Transaction { get; }

        public TransactionDetails(Transaction transaction)
        {
            Transaction = transaction;
        }
    }

}
