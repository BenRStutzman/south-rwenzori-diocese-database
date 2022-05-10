namespace SrdDatabase.Models.Sacco.Installments
{
    public class InstallmentDetails
    {
        public Installment Installment { get; }

        public InstallmentDetails(Installment installment)
        {
            Installment = installment;
        }
    }

}
