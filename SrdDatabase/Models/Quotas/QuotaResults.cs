using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Quotas
{
    public class QuotaResults : PagedResults
    {
        public IEnumerable<Quota> Quotas { get; }

        public QuotaResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Quota> quotas)
            : base(pageNumber, pageSize, totalResults)
        {
            Quotas = quotas;
        }
    }
}
