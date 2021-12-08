using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Congregations
{
    public class CongregationResults : PagedResults
    {
        public IEnumerable<Congregation> Congregations { get; }

        public CongregationResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Congregation> congregations)
            : base(pageNumber, pageSize, totalResults)
        {
            Congregations = congregations;
        }
    }
}
