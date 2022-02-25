using SrdDatabase.Models.Archdeaconries;
using SrdDatabase.Models.Censuses;
using SrdDatabase.Models.Charges;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Parishes;
using SrdDatabase.Models.Payments;

namespace SrdDatabase.Models.Diocese
{
    public class DioceseDetails
    {
        public ArchdeaconryResults ArchdeaconryResults { get; }

        public ParishResults ParishResults { get; }

        public CongregationResults CongregationResults { get; }

        public EventResults EventResults { get; }

        public PaymentResults PaymentResults { get; }

        public ChargeResults ChargeResults { get; }

        public CensusResults CensusResults { get; }

        public int NumberOfChristians { get; }

        public int Balance { get; }

        public DioceseDetails(
            ArchdeaconryResults archdeaconryResults,
            ParishResults parishResults,
            CongregationResults congregationResults,
            EventResults eventResults,
            PaymentResults paymentResults,
            ChargeResults chargeResults,
            CensusResults censusResults,
            int numberOfChristians,
            int balance)
        {
            ArchdeaconryResults = archdeaconryResults;
            ParishResults = parishResults;
            CongregationResults = congregationResults;
            EventResults = eventResults;
            PaymentResults = paymentResults;
            ChargeResults = chargeResults;
            CensusResults = censusResults;
            NumberOfChristians = numberOfChristians;
            Balance = balance;
        }
    }

}
