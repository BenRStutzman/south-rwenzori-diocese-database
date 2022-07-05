using SrdDatabase.Models.Quotas;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Payments;
using SrdDatabase.Models.Shared;

namespace SrdDatabase.Models.Congregations
{
    public class CongregationDetails
    {
        public Congregation Congregation { get; }

        public Population Population { get; }

        public EventResults EventResults { get; }

        public PaymentResults PaymentResults { get; }

        public QuotaResults QuotaResults { get; }

        public CongregationDetails(
            Congregation congregation,
            Population population,
            EventResults eventResults,
            PaymentResults transactionResults,
            QuotaResults quotaResults)
        {
            Congregation = congregation;
            Population = population;
            EventResults = eventResults;
            PaymentResults = transactionResults;
            QuotaResults = quotaResults;
        }
    }

}
