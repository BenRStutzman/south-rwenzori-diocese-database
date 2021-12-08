using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Archdeaconries
{
    public class ArchdeaconryResults : PagedResults
    {
        public IEnumerable<Archdeaconry> Archdeaconries { get; }

        public ArchdeaconryResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Archdeaconry> archdeaconries)
            : base(pageNumber, pageSize, totalResults)
        {
            Archdeaconries = archdeaconries;
        }
    }
}
