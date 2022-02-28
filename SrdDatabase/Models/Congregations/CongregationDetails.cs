using SrdDatabase.Models.Censuses;
using SrdDatabase.Models.Quotas;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Payments;

namespace SrdDatabase.Models.Congregations
{
    public class CongregationDetails
    {
        public Congregation Congregation { get; }

        public EventResults EventResults { get; }

        public PaymentResults PaymentResults { get; }

        public QuotaResults QuotaResults { get; }

        public CensusResults CensusResults { get; }

        public CongregationDetails(
            Congregation congregation,
            EventResults eventResults,
            PaymentResults transactionResults,
            QuotaResults quotaResults,
            CensusResults censusResults)
        {
            Congregation = congregation;
            EventResults = eventResults;
            PaymentResults = transactionResults;
            QuotaResults = quotaResults;
            CensusResults = censusResults;
        }
    }

}
