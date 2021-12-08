using System.Collections.Generic;
using Congregations = SrdDatabase.Models.Congregations;
using Events = SrdDatabase.Models.Events;
using Parishes = SrdDatabase.Models.Parishes;

namespace SrdDatabase.Models.Archdeaconries
{
    public class ArchdeaconryDetails
    {
        public Archdeaconry Archdeaconry { get; }

        public Parishes.ParishResults ParishResults { get; }

        public Congregations.CongregationResults CongregationResults { get; }

        public Events.EventResults EventResults { get; }

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
