using SrdDatabase.Models.Sacco.Distributions;
using SrdDatabase.Models.Sacco.Loans;
using SrdDatabase.Models.Sacco.Transactions;

namespace SrdDatabase.Models.Sacco.Members
{
    public class MemberDetails
    {
        public Member Member { get; }

        public TransactionResults TransactionResults { get; }

        public DistributionAppliedResults DistributionAppliedResults { get; }

        public LoanResults LoanResults { get; }

        public MemberDetails(
            Member member,
            TransactionResults transactionResults,
            DistributionAppliedResults distributionAppliedResults,
            LoanResults loanResults)
        {
            Member = member;
            TransactionResults = transactionResults;
            DistributionAppliedResults = distributionAppliedResults;
            LoanResults = loanResults;
        }
    }

}
