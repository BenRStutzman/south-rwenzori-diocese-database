
using System.Collections.Generic;

namespace SrdDatabase.Models
{
    public class ArchdeaconryDetails
    {
        public Archdeaconry Archdeaconry { get; }

        public IEnumerable<Parish> Parishes { get; }

        public IEnumerable<Congregation> Congregations { get; }

        public IEnumerable<Event> Events { get; }

        public ArchdeaconryDetails(
            Archdeaconry archdeaconry,
            IEnumerable<Parish> parishes,
            IEnumerable<Congregation> congregations,
            IEnumerable<Event> events)
        {
            Archdeaconry = archdeaconry;
            Parishes = parishes;
            Congregations = congregations;
            Events = events;
        }
    }

}
