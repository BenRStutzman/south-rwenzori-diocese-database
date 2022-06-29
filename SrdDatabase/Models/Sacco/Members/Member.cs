using System;

namespace SrdDatabase.Models.Sacco.Members
{
    public class Member
    {
        public int Id { get; }

        public int AccountNumber { get; }

        public string Name { get; }

        public bool IsChurch { get; }

        public DateTime DateJoined { get; }

        public DateTime AutoFeesStartDate { get; }

        public int YearsOfFees { get; }

        public int Shares { get; }

        public int SharesValue { get; }

        public int Savings { get; }

        public int Balance { get; }

        public Member(
            int id,
            int accountNumber,
            string name,
            bool isChurch,
            DateTime dateJoined,
            DateTime autoFeesStartDate,
            int yearsOfFees,
            int shares,
            int sharesValue,
            int savings,
            int balance)
        {
            Id = id;
            AccountNumber = accountNumber;
            Name = name;
            IsChurch = isChurch;
            DateJoined = dateJoined;
            AutoFeesStartDate = autoFeesStartDate;
            YearsOfFees = yearsOfFees;
            Shares = shares;
            SharesValue = sharesValue;
            Savings = savings;
            Balance = balance;
        }

        // for Dapper
        public Member()
        {
        }
    }
}
