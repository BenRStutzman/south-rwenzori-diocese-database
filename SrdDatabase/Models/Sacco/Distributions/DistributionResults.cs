using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Sacco.Distributions
{
    public class DistributionResults : PagedResults
    {
        public IEnumerable<Distribution> Distributions { get; }

        public DistributionResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Distribution> distributions)
            : base(pageNumber, pageSize, totalResults)
        {
            Distributions = distributions;
        }
    }
}
