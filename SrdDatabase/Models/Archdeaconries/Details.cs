using System.Collections.Generic;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Parishes;

namespace SrdDatabase.Models.Archdeaconries
{
    public class Details
    {
        public Archdeaconry Archdeaconry { get; }

        public IEnumerable<Parish> Parishes { get; }

        public IEnumerable<Congregation> Congregations { get; }

        public IEnumerable<Event> RecentEvents { get; }

        public Details(
            Archdeaconry archdeaconry,
            IEnumerable<Parish> parishes,
            IEnumerable<Congregation> congregations,
            IEnumerable<Event> recentEvents)
        {
            Archdeaconry = archdeaconry;
            Parishes = parishes;
            Congregations = congregations;
            RecentEvents = recentEvents;
        }
    }

}
