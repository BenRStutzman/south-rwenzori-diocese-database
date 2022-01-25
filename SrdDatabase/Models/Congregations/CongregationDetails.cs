using SrdDatabase.Models.Events;
using SrdDatabase.Models.Payments;

namespace SrdDatabase.Models.Congregations
{
    public class CongregationDetails
    {
        public Congregation Congregation { get; }

        public EventResults EventResults { get; }

        public PaymentResults PaymentResults { get; }

        public CongregationDetails(
            Congregation congregation,
            EventResults eventResults,
            PaymentResults transactionResults)
        {
            Congregation = congregation;
            EventResults = eventResults;
            PaymentResults = transactionResults;
        }
    }

}
