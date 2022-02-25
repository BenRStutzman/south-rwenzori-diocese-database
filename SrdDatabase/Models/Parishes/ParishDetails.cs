using SrdDatabase.Models.Censuses;
using SrdDatabase.Models.Charges;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Payments;

namespace SrdDatabase.Models.Parishes
{
    public class ParishDetails
    {
        public Parish Parish { get; }

        public CongregationResults CongregationResults { get; }

        public EventResults EventResults { get; }

        public PaymentResults PaymentResults { get; }

        public ChargeResults ChargeResults { get; }

        public CensusResults CensusResults { get; }

        public ParishDetails(
            Parish parish,
            CongregationResults congregationResults,
            EventResults recentEvents,
            PaymentResults paymentResults,
            ChargeResults chargeResults,
            CensusResults censusResults)
        {
            Parish = parish;
            CongregationResults = congregationResults;
            EventResults = recentEvents;
            PaymentResults = paymentResults;
            ChargeResults = chargeResults;
            CensusResults = censusResults;
        }
    }

}
