using SrdDatabase.Models.Sacco.Installments;
using SrdDatabase.Models.Sacco.Payments;

namespace SrdDatabase.Models.Sacco.Loans
{
    public class LoanDetails
    {
        public Loan Loan { get; }

        public InstallmentResults InstallmentResults { get; }

        public PaymentResults PaymentResults { get; }

        public LoanDetails(
            Loan loan,
            InstallmentResults installmentResults,
            PaymentResults paymentResults)
        {
            Loan = loan;
            InstallmentResults = installmentResults;
            PaymentResults = paymentResults;
        }
    }

}
