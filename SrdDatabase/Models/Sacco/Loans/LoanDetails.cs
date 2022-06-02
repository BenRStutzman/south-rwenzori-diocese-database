using SrdDatabase.Models.Sacco.Installments;

namespace SrdDatabase.Models.Sacco.Loans
{
    public class LoanDetails
    {
        public Loan Loan { get; }

        public InstallmentResults InstallmentResults { get; }

        public LoanDetails(Loan loan, InstallmentResults installmentResults)
        {
            Loan = loan;
            InstallmentResults = installmentResults;
        }
    }

}
