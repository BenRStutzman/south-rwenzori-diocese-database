using SrdDatabase.Models.Sacco.Distributions;
using SrdDatabase.Models.Sacco.Members;
using SrdDatabase.Models.Sacco.Transactions;

namespace SrdDatabase.Models.Sacco
{
    public class SaccoDetails
    {
        public MemberResults MemberResults { get; }

        public TransactionResults TransactionResults { get; }

        public DistributionResults DistributionResults { get; }

        public SaccoDetails(
            MemberResults memberResults,
            TransactionResults transactionResults,
            DistributionResults distributionResults
            )
        {
            MemberResults = memberResults;
            TransactionResults = transactionResults;
            DistributionResults = distributionResults;
        }

        public SaccoDetails(
            MemberResults memberResults,
            TransactionResults transactionResults,
            DistributionResults distributionResults,
            SaccoDetails saccoDetails
        ) : this(
            memberResults,
            transactionResults,
            distributionResults
            )
        {
        }

        // for Dapper
        public SaccoDetails()
        {
        }
    }

}
