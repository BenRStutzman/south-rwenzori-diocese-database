using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;

namespace SrdDatabase.Models.Parishes
{
    public class ParishDetails
    {
        public Parish Parish { get; }

        public CongregationResults CongregationResults { get; }

        public EventResults EventResults { get; }

        public ParishDetails(
            Parish parish,
            CongregationResults congregationResults,
            EventResults recentEvents)
        {
            Parish = parish;
            CongregationResults = congregationResults;
            EventResults = recentEvents;
        }
    }

}
