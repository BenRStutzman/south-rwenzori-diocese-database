using SrdDatabase.Models.Events;

namespace SrdDatabase.Models.Congregations
{
    public class CongregationDetails
    {
        public Congregation Congregation { get; }

        public EventResults EventsResults { get; }

        public CongregationDetails(
            Congregation congregation,
            EventResults eventResults)
        {
            Congregation = congregation;
            EventsResults = eventResults;
        }
    }

}
