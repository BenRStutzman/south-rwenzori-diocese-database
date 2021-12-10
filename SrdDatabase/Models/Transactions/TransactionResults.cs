using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Transactions
{
    public class TransactionResults : PagedResults
    {
        public IEnumerable<Transaction> Transactions { get; }

        public TransactionResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Transaction> transactions)
            : base(pageNumber, pageSize, totalResults)
        {
            Transactions = transactions;
        }
    }
}
