using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Sacco.Dividends
{
    public class DividendAppliedResults : PagedResults
    {
        public IEnumerable<DividendApplied> DividendsApplied { get; }

        public DividendAppliedResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<DividendApplied> dividendsApplied)
            : base(pageNumber, pageSize, totalResults)
        {
            DividendsApplied = dividendsApplied;
        }
    }
}
