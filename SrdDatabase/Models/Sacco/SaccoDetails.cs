using SrdDatabase.Models.Sacco.Distributions;
using SrdDatabase.Models.Sacco.Loans;
using SrdDatabase.Models.Sacco.Members;
using SrdDatabase.Models.Sacco.Transactions;

namespace SrdDatabase.Models.Sacco
{
    public class SaccoDetails
    {
        public MemberResults MemberResults { get; }

        public TransactionResults TransactionResults { get; }

        public DistributionResults DistributionResults { get; }

        public LoanResults LoanResults { get; }

        public SaccoDetails(
            MemberResults memberResults,
            TransactionResults transactionResults,
            DistributionResults distributionResults,
            LoanResults loanResults
            )
        {
            MemberResults = memberResults;
            TransactionResults = transactionResults;
            DistributionResults = distributionResults;
            LoanResults = loanResults;
        }

        public SaccoDetails(
            MemberResults memberResults,
            TransactionResults transactionResults,
            DistributionResults distributionResults,
            LoanResults loanResults,
            SaccoDetails saccoDetails
        ) : this(
            memberResults,
            transactionResults,
            distributionResults,
            loanResults
            )
        {
            // Add stuff here when getting details like total savings, etc.
        }

        // for Dapper
        public SaccoDetails()
        {
        }
    }

}
