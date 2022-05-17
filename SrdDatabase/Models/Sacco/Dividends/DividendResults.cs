using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Sacco.Dividends
{
    public class DividendResults : PagedResults
    {
        public IEnumerable<Dividend> Dividends { get; }

        public DividendResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Dividend> dividends)
            : base(pageNumber, pageSize, totalResults)
        {
            Dividends = dividends;
        }
    }
}
