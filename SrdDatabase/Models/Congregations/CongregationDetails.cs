using SrdDatabase.Models.Events;
using SrdDatabase.Models.Transactions;

namespace SrdDatabase.Models.Congregations
{
    public class CongregationDetails
    {
        public Congregation Congregation { get; }

        public EventResults EventResults { get; }

        public TransactionResults TransactionResults { get; }

        public CongregationDetails(
            Congregation congregation,
            EventResults eventResults,
            TransactionResults transactionResults)
        {
            Congregation = congregation;
            EventResults = eventResults;
            TransactionResults = transactionResults;
        }
    }

}
