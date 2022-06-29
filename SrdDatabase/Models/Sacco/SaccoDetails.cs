using SrdDatabase.Models.Sacco.Distributions;
using SrdDatabase.Models.Sacco.Loans;
using SrdDatabase.Models.Sacco.Members;
using SrdDatabase.Models.Sacco.Payments;
using SrdDatabase.Models.Sacco.Transactions;

namespace SrdDatabase.Models.Sacco
{
    public class SaccoDetails
    {
        public MemberResults MemberResults { get; }

        public TransactionResults TransactionResults { get; }

        public LoanResults LoanResults { get; }

        public PaymentResults PaymentResults { get; }

        public int Shares { get; }

        public long SharesValue { get; }

        public long Savings { get; }

        public long Balance { get; }

        public long LoanBalance { get; }

        public SaccoDetails(
            MemberResults memberResults,
            TransactionResults transactionResults,
            LoanResults loanResults,
            PaymentResults paymentResults,
            int shares,
            long sharesValue,
            long savings,
            long balance,
            long loanBalance
            )
        {
            MemberResults = memberResults;
            TransactionResults = transactionResults;
            LoanResults = loanResults;
            PaymentResults = paymentResults;
            Shares = shares;
            SharesValue = sharesValue;
            Savings = savings;
            Balance = balance;
            LoanBalance = loanBalance;
        }

        public SaccoDetails(
            MemberResults memberResults,
            TransactionResults transactionResults,
            LoanResults loanResults,
            PaymentResults paymentResults,
            SaccoDetails saccoDetails
        ) : this(
            memberResults,
            transactionResults,
            loanResults,
            paymentResults,
            saccoDetails.Shares,
            saccoDetails.SharesValue,
            saccoDetails.Savings,
            saccoDetails.Balance,
            saccoDetails.LoanBalance
            )
        {
        }

        // for Dapper
        public SaccoDetails()
        {
        }
    }

}
