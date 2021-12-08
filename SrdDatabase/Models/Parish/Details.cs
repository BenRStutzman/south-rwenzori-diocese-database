using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using System.Collections.Generic;

namespace SrdDatabase.Models.Parishes
{
    public class Details
    {
        public Parish Parish { get; }

        public IEnumerable<Congregation> Congregations { get; }

        public IEnumerable<Event> RecentEvents { get; }

        public Details(
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
