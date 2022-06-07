using System;

namespace SrdDatabase.Models.Sacco.Transactions
{
    public class Transaction
    {
        public int Id { get; }

        public int MemberId { get; }

        public string Member { get; }

        public int AccountNumber { get; }

        public DateTime Date { get; }

        public bool IsShares { get; }

        public bool IsContribution { get; }

        public int Amount { get; }

        public int? ReceiptNumber { get; }

        public string Notes { get; }

        public string CreatedBy { get; }

        public string UpdatedBy { get; }

        public Transaction(
            int id,
            int memberId,
            string member,
            int accountNumber,
            DateTime date,
            bool isShares,
            bool isContribution,
            int amount,
            int? receiptNumber,
            string notes,
            string createdBy,
            string updatedBy)
        {
            Id = id;
            MemberId = memberId;
            Member = member;
            AccountNumber = accountNumber;
            Date = date;
            IsShares = isShares;
            IsContribution = isContribution;
            Amount = amount;
            ReceiptNumber = receiptNumber;
            Notes = notes;
            CreatedBy = createdBy;
            UpdatedBy = updatedBy;
        }

        // for Dapper
        public Transaction()
        {
        }
    }
}
