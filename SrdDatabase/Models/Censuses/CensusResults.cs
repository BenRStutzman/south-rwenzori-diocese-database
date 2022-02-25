using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Censuses
{
    public class CensusResults : PagedResults
    {
        public IEnumerable<Census> Censuses { get; }

        public CensusResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Census> censuses)
            : base(pageNumber, pageSize, totalResults)
        {
            Censuses = censuses;
        }
    }
}
