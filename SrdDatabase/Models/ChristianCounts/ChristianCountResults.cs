using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.ChristianCounts
{
    public class ChristianCountResults : PagedResults
    {
        public IEnumerable<ChristianCount> ChristianCounts { get; }

        public ChristianCountResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<ChristianCount> christianCounts)
            : base(pageNumber, pageSize, totalResults)
        {
            ChristianCounts = christianCounts;
        }
    }
}
