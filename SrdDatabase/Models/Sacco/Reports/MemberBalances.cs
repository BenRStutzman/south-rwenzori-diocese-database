namespace SrdDatabase.Models.Sacco.Reports
{
    public class MemberBalances
    {
        public int Shares { get; }

        public int SharesValue { get; }

        public int Savings { get; }

        public int Balance { get; }

        public MemberBalances(
            int shares,
            int sharesValue,
            int savings,
            int balance
        )
        {
            Shares = shares;
            SharesValue = sharesValue;
            Savings = savings;
            Balance = balance;
        }

        // for Dapper
        public MemberBalances()
        {
        }
    }
}
