using SrdDatabase.Models.Sacco.Dividends;
using SrdDatabase.Models.Sacco.Members;
using SrdDatabase.Models.Sacco.Transactions;

namespace SrdDatabase.Models.Sacco
{
    public class SaccoDetails
    {
        public MemberResults MemberResults { get; }

        public TransactionResults TransactionResults { get; }

        public DividendResults DividendResults { get; }

        public SaccoDetails(
            MemberResults memberResults,
            TransactionResults transactionResults,
            DividendResults dividendResults
            )
        {
            MemberResults = memberResults;
            TransactionResults = transactionResults;
            DividendResults = dividendResults;
        }

        public SaccoDetails(
            MemberResults memberResults,
            TransactionResults transactionResults,
            DividendResults dividendResults,
            SaccoDetails saccoDetails
        ) : this(
            memberResults,
            transactionResults,
            dividendResults
            )
        {
        }

        // for Dapper
        public SaccoDetails()
        {
        }
    }

}
