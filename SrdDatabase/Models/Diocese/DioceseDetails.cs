using SrdDatabase.Models.Archdeaconries;
using SrdDatabase.Models.Censuses;
using SrdDatabase.Models.Quotas;
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

        public QuotaResults QuotaResults { get; }

        public CensusResults CensusResults { get; }

        public int? NumberOfChristians { get; }

        public int Quota { get; }

        public int Balance { get; }

        public DioceseDetails(
            ArchdeaconryResults archdeaconryResults,
            ParishResults parishResults,
            CongregationResults congregationResults,
            EventResults eventResults,
            PaymentResults paymentResults,
            QuotaResults quotaResults,
            CensusResults censusResults,
            int? numberOfChristians,
            int quota,
            int balance)
        {
            ArchdeaconryResults = archdeaconryResults;
            ParishResults = parishResults;
            CongregationResults = congregationResults;
            EventResults = eventResults;
            PaymentResults = paymentResults;
            QuotaResults = quotaResults;
            CensusResults = censusResults;
            NumberOfChristians = numberOfChristians;
            Quota = quota;
            Balance = balance;
        }

        public DioceseDetails(
            ArchdeaconryResults archdeaconryResults,
            ParishResults parishResults,
            CongregationResults congregationResults,
            EventResults eventResults,
            PaymentResults paymentResults,
            QuotaResults quotaResults,
            CensusResults censusResults,
            DioceseDetails dioceseDetails
        ) : this(
            archdeaconryResults,
            parishResults,
            congregationResults,
            eventResults,
            paymentResults,
            quotaResults,
            censusResults,
            dioceseDetails.NumberOfChristians,
            dioceseDetails.Quota,
            dioceseDetails.Balance
            )
        {
        }

        // for Dapper
        public DioceseDetails()
        {
        }
    }

}
