using System;

namespace SrdDatabase.Models.Sacco.Members
{
    public class Member
    {
        public int Id { get; }

        public int AccountNumber { get; }

        public string Name { get; }

        public DateTime DateJoined { get; }

        public Member(
            int id,
            int accountNumber,
            string name,
            DateTime dateJoined)
        {
            Id = id;
            AccountNumber = accountNumber;
            Name = name;
            DateJoined = dateJoined;
        }

        // for Dapper
        public Member()
        {
        }
    }
}
