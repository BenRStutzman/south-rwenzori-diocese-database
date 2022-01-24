using SrdDatabase.Models.Archdeaconries;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Parishes;
using SrdDatabase.Models.Transactions;

namespace SrdDatabase.Models.Diocese
{
    public class DioceseDetails
    {
        public ArchdeaconryResults ArchdeaconryResults { get; }

        public ParishResults ParishResults { get; }

        public CongregationResults CongregationResults { get; }

        public EventResults EventResults { get; }

        public ChargeResults TransactionResults { get; }

        public DioceseDetails(
            ArchdeaconryResults archdeaconryResults,
            ParishResults parishResults,
            CongregationResults congregationResults,
            EventResults eventResults,
            ChargeResults transactionResults)
        {
            ArchdeaconryResults = archdeaconryResults;
            ParishResults = parishResults;
            CongregationResults = congregationResults;
            EventResults = eventResults;
            TransactionResults = transactionResults;
        }
    }

}
