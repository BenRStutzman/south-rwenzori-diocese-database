using System.Collections.Generic;

namespace SrdDatabase.Models.Sacco.Installments
{
    public class InstallmentDetails
    {
        public Installment Installment { get; }

        public IEnumerable<FineWindow> FineWindows { get; }

        public InstallmentDetails(Installment installment, IEnumerable<FineWindow> fineWindows)
        {
            Installment = installment;
            FineWindows = fineWindows;
        }
    }
}
