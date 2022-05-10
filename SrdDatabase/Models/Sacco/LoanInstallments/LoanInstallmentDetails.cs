namespace SrdDatabase.Models.Sacco.LoanInstallments
{
    public class LoanInstallmentDetails
    {
        public LoanInstallment LoanInstallment { get; }

        public LoanInstallmentDetails(LoanInstallment loanInstallment)
        {
            LoanInstallment = loanInstallment;
        }
    }

}
