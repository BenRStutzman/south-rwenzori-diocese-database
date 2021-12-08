using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Parishes;

namespace SrdDatabase.Models.Archdeaconries
{
    public class ArchdeaconryDetails
    {
        public Archdeaconry Archdeaconry { get; }

        public ParishResults ParishResults { get; }

        public CongregationResults CongregationResults { get; }

        public EventResults EventResults { get; }

        public ArchdeaconryDetails(
            Archdeaconry archdeaconry,
            Parishes.ParishResults parishResults,
            Congregations.CongregationResults congregationResults,
            Events.EventResults eventResults)
        {
            Archdeaconry = archdeaconry;
            ParishResults = parishResults;
            CongregationResults = congregationResults;
            EventResults = eventResults;
        }
    }

}
