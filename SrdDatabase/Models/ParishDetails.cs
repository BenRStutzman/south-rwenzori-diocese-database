
using System.Collections.Generic;

namespace SrdDatabase.Models
{
    public class ParishDetails
    {
        public Parish Parish { get; }

        public IEnumerable<Congregation> Congregations { get; }

        public IEnumerable<Event> RecentEvents { get; }

        public ParishDetails(
            Parish parish,
            IEnumerable<Congregation> congregations,
            IEnumerable<Event> recentEvents)
        {
            Parish = parish;
            Congregations = congregations;
            RecentEvents = recentEvents;
        }
    }

}
