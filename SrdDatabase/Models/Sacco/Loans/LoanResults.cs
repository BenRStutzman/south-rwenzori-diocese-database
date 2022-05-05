using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Sacco.Loans
{
    public class LoanResults : PagedResults
    {
        public IEnumerable<Loan> Loans { get; }

        public LoanResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Loan> loans)
            : base(pageNumber, pageSize, totalResults)
        {
            Loans = loans;
        }
    }
}
