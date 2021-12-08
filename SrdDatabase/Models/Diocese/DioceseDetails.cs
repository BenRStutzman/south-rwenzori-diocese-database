
using System.Collections.Generic;
using SrdDatabase.Models.Archdeaconries;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Parishes;

namespace SrdDatabase.Models.Diocese
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
