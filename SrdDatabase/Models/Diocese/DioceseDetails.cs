using SrdDatabase.Models.Archdeaconries;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Parishes;

namespace SrdDatabase.Models.Diocese
{
    public class DioceseDetails
    {
        public ArchdeaconryResults ArchdeaconryResults { get; }

        public ParishResults ParishResults { get; }

        public CongregationResults CongregationResults { get; }

        public EventResults EventResults { get; }

        public int Balance { get; }

        public DioceseDetails(
            ArchdeaconryResults archdeaconryResults,
            ParishResults parishResults,
            CongregationResults congregationResults,
            EventResults eventResults,
            int balance)
        {
            ArchdeaconryResults = archdeaconryResults;
            ParishResults = parishResults;
            CongregationResults = congregationResults;
            EventResults = eventResults;
            Balance = balance;
        }
    }

}
