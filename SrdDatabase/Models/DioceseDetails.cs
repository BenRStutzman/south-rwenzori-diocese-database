
using System.Collections.Generic;

namespace SrdDatabase.Models
{
    public class DioceseDetails
    {
        public IEnumerable<Archdeaconry> Archdeaconries{ get; }

        public IEnumerable<Parish> Parishes { get; }

        public IEnumerable<Congregation> Congregations { get; }

        public IEnumerable<Event> RecentEvents { get; }

        public DioceseDetails(
            IEnumerable<Archdeaconry> archdeaconries,
            IEnumerable<Parish> parishes,
            IEnumerable<Congregation> congregations,
            IEnumerable<Event> recentEvents)
        {
            Archdeaconries = archdeaconries;
            Parishes = parishes;
            Congregations = congregations;
            RecentEvents = recentEvents;
        }
    }

}
