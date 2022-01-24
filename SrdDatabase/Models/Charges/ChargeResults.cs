using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Charges
{
    public class ChargeResults : PagedResults
    {
        public IEnumerable<Charge> Charges { get; }

        public ChargeResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Charge> charges)
            : base(pageNumber, pageSize, totalResults)
        {
            Charges = charges;
        }
    }
}
