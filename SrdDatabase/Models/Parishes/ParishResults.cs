using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Parishes
{
    public class ParishResults : PagedResults
    {
        public IEnumerable<Parish> Parishes { get; }

        public ParishResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Parish> parishes)
            : base(pageNumber, pageSize, totalResults)
        {
            Parishes = parishes;
        }
    }
}
