using SrdDatabase.Models.Censuses;
using SrdDatabase.Models.Quotas;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Parishes;
using SrdDatabase.Models.Payments;

namespace SrdDatabase.Models.Archdeaconries
{
    public class ArchdeaconryDetails
    {
        public Archdeaconry Archdeaconry { get; }

        public ParishResults ParishResults { get; }

        public CongregationResults CongregationResults { get; }

        public EventResults EventResults { get; }

        public PaymentResults PaymentResults { get; }

        public QuotaResults QuotaResults { get; }

        public CensusResults CensusResults { get; }

        public ArchdeaconryDetails(
            Archdeaconry archdeaconry,
            ParishResults parishResults,
            CongregationResults congregationResults,
            EventResults eventResults,
            PaymentResults paymentResults,
            QuotaResults quotaResults,
            CensusResults censusResults)
        {
            Archdeaconry = archdeaconry;
            ParishResults = parishResults;
            CongregationResults = congregationResults;
            EventResults = eventResults;
            PaymentResults = paymentResults;
            QuotaResults = quotaResults;
            CensusResults = censusResults;
        }
    }

}
