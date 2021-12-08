using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Events
{
    public class EventResults : PagedResults
    {
        public IEnumerable<Event> Events { get; }

        public EventResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Event> events)
            : base(pageNumber, pageSize, totalResults)
        {
            Events = events;
        }
    }
}
