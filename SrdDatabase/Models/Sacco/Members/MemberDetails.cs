using SrdDatabase.Models.Sacco.Distributions;
using SrdDatabase.Models.Sacco.Installments;
using SrdDatabase.Models.Sacco.Loans;
using SrdDatabase.Models.Sacco.Payments;
using SrdDatabase.Models.Sacco.Transactions;

namespace SrdDatabase.Models.Sacco.Members
{
    public class MemberDetails
    {
        public Member Member { get; }

        public TransactionResults TransactionResults { get; }

        public DistributionAppliedResults DistributionAppliedResults { get; }

        public LoanResults LoanResults { get; }

        public InstallmentResults InstallmentResults { get; }

        public PaymentResults PaymentResults { get; }

        public MemberDetails(
            Member member,
            TransactionResults transactionResults,
            DistributionAppliedResults distributionAppliedResults,
            LoanResults loanResults,
            InstallmentResults installmentResults,
            PaymentResults paymentResults)
        {
            Member = member;
            TransactionResults = transactionResults;
            DistributionAppliedResults = distributionAppliedResults;
            LoanResults = loanResults;
            InstallmentResults = installmentResults;
            PaymentResults = paymentResults;
        }
    }

}
