using SrdDatabase.Models.Quotas;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Parishes;
using SrdDatabase.Models.Payments;
using SrdDatabase.Models.Shared;

namespace SrdDatabase.Models.Archdeaconries
{
    public class ArchdeaconryDetails
    {
        public Archdeaconry Archdeaconry { get; }

        public Population Population { get; }

        public ParishResults ParishResults { get; }

        public CongregationResults CongregationResults { get; }

        public EventResults EventResults { get; }

        public PaymentResults PaymentResults { get; }

        public QuotaResults QuotaResults { get; }

        public ArchdeaconryDetails(
            Archdeaconry archdeaconry,
            Population population,
            ParishResults parishResults,
            CongregationResults congregationResults,
            EventResults eventResults,
            PaymentResults paymentResults,
            QuotaResults quotaResults)
        {
            Archdeaconry = archdeaconry;
            Population = population;
            ParishResults = parishResults;
            CongregationResults = congregationResults;
            EventResults = eventResults;
            PaymentResults = paymentResults;
            QuotaResults = quotaResults;
        }
    }

}
