using SrdDatabase.Models.Events;
using System.Collections.Generic;

namespace SrdDatabase.Models.Congregations
{
    public class Details
    {
        public Congregation Congregation { get; }

        public IEnumerable<Event> RecentEvents { get; }

        public Details(
            Congregation congregation,
            IEnumerable<Event> recentEvents)
        {
            Congregation = congregation;
            RecentEvents = recentEvents;
        }
    }

}
