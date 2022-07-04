using SrdDatabase.Models.Sacco.Transactions;

namespace SrdDatabase.Helpers
{
    public static class TransactionHelper
    {
        public static string TransactionAction(Transaction transaction, bool includeShares = false)
        {
            var sharesString = includeShares ? $"{transaction.Amount} " : string.Empty;

            return transaction.IsShares
                ? transaction.IsContribution ? $"Purchase of {sharesString}shares" : $"Sale of {sharesString}shares"
                : transaction.IsContribution ? "Contribution to savings" : "Withdrawal from savings";
        }
    }
}
