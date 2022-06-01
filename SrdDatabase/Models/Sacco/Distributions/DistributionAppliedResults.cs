using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Sacco.Distributions
{
    public class DistributionAppliedResults : PagedResults
    {
        public IEnumerable<DistributionApplied> DistributionsApplied { get; }

        public DistributionAppliedResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<DistributionApplied> distributionsApplied)
            : base(pageNumber, pageSize, totalResults)
        {
            DistributionsApplied = distributionsApplied;
        }
    }
}
