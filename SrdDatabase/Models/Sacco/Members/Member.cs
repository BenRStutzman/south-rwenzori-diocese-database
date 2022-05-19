using System;

namespace SrdDatabase.Models.Sacco.Members
{
    public class Member
    {
        public int Id { get; }

        public int AccountNumber { get; }

        public string Name { get; }

        public DateTime DateJoined { get; }

        public DateTime AutoFeesStartDate { get; }

        public int Shares { get; }

        public int Savings { get; }

        public int Balance { get; }

        public Member(
            int id,
            int accountNumber,
            string name,
            DateTime dateJoined,
            DateTime autoFeesStartDate,
            int shares,
            int savings,
            int balance)
        {
            Id = id;
            AccountNumber = accountNumber;
            Name = name;
            DateJoined = dateJoined;
            AutoFeesStartDate = autoFeesStartDate;
            Shares = shares;
            Savings = savings;
            Balance = balance;
        }

        // for Dapper
        public Member()
        {
        }
    }
}
