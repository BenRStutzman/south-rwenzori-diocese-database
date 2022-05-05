namespace SrdDatabase.Models.Sacco.Loans
{
    public class LoanDetails
    {
        public Loan Loan { get; }

        public LoanDetails(Loan loan)
        {
            Loan = loan;
        }
    }

}
