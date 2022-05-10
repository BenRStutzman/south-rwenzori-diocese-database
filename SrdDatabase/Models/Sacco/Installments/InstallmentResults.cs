using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Sacco.Installments
{
    public class InstallmentResults : PagedResults
    {
        public IEnumerable<Installment> Installments { get; }

        public InstallmentResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Installment> installments)
            : base(pageNumber, pageSize, totalResults)
        {
            Installments = installments;
        }
    }
}
