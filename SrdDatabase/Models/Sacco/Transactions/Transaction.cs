using System;

namespace SrdDatabase.Models.Sacco.Transactions
{
    public class Transaction
    {
        public int Id { get; }

        public int MemberId { get; }

        public string Member { get; }

        public DateTime Date { get; }

        public bool IsShares { get; }

        public bool IsContribution { get; }

        public int Amount { get; }

        public int ReceiptNumber { get; }

        public Transaction(
            int id,
            int memberId,
            string member,
            DateTime date,
            bool isShares,
            bool isContribution,
            int amount,
            int receiptNumber)
        {
            Id = id;
            MemberId = memberId;
            Member = member;
            Date = date;
            IsShares = isShares;
            IsContribution = isContribution;
            Amount = amount;
            ReceiptNumber = receiptNumber;
        }

        // for Dapper
        public Transaction()
        {
        }
    }
}
