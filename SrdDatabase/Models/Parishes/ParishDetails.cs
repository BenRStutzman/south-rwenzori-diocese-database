using SrdDatabase.Models.Quotas;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Payments;
using SrdDatabase.Models.Shared;

namespace SrdDatabase.Models.Parishes
{
    public class ParishDetails
    {
        public Parish Parish { get; }

        public Population Population { get; }

        public CongregationResults CongregationResults { get; }

        public EventResults EventResults { get; }

        public PaymentResults PaymentResults { get; }

        public QuotaResults QuotaResults { get; }

        public ParishDetails(
            Parish parish,
            Population population,
            CongregationResults congregationResults,
            EventResults recentEvents,
            PaymentResults paymentResults,
            QuotaResults quotaResults)
        {
            Parish = parish;
            Population = population;
            CongregationResults = congregationResults;
            EventResults = recentEvents;
            PaymentResults = paymentResults;
            QuotaResults = quotaResults;
        }
    }

}
