using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Sacco.LoanInstallments
{
    public class LoanInstallmentResults : PagedResults
    {
        public IEnumerable<LoanInstallment> LoanInstallments { get; }

        public LoanInstallmentResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<LoanInstallment> loanInstallments)
            : base(pageNumber, pageSize, totalResults)
        {
            LoanInstallments = loanInstallments;
        }
    }
}
