using SrdDatabase.Models.Archdeaconries;
using SrdDatabase.Models.Quotas;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Parishes;
using SrdDatabase.Models.Payments;
using SrdDatabase.Models.Shared;

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

        public Population Population { get; }

        public int? NumberOfChristians { get; }

        public long Quota { get; }

        public long Balance { get; }

        public DioceseDetails(
            ArchdeaconryResults archdeaconryResults,
            ParishResults parishResults,
            CongregationResults congregationResults,
            EventResults eventResults,
            PaymentResults paymentResults,
            QuotaResults quotaResults,
            Population population,
            int? numberOfChristians,
            long quota,
            long balance)
        {
            ArchdeaconryResults = archdeaconryResults;
            ParishResults = parishResults;
            CongregationResults = congregationResults;
            EventResults = eventResults;
            PaymentResults = paymentResults;
            QuotaResults = quotaResults;
            Population = population;
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
            Population population,
            DioceseDetails dioceseDetails
        ) : this(
            archdeaconryResults,
            parishResults,
            congregationResults,
            eventResults,
            paymentResults,
            quotaResults,
            population,
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
