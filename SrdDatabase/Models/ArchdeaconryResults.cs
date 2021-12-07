using System.Collections.Generic;

namespace SrdDatabase.Models
{
    public class ArchdeaconryResults
    {
        public int PageNumber { get; }

        public int? PageSize { get; }

        public int TotalResults { get; }

        public IEnumerable<Archdeaconry> Archdeaconries { get; }

        public ArchdeaconryResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Archdeaconry> archdeaconries)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalResults = totalResults;
            Archdeaconries = archdeaconries;
        }
    }
}
