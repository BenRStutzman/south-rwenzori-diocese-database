
using System.Collections.Generic;

namespace SrdDatabase.Models
{
    public class ParishDetails
    {
        public Parish Parish { get; }

        public IEnumerable<Congregation> Congregations { get; }

        public IEnumerable<Event> Events { get; }

        public ParishDetails(
            Parish parish,
            IEnumerable<Congregation> congregations,
            IEnumerable<Event> events)
        {
            Parish = parish;
            Congregations = congregations;
            Events = events;
        }
    }

}
