using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Transactions
{
    public class TransactionFields : SaveFields
    {
        [Range(1, int.MaxValue)]
        public int MemberId { get; }

        [Required]
        public DateTime Date { get; }

        [Required]
        public bool IsShares { get; }

        [Required]
        public bool IsContribution { get; }

        [Range(1, int.MaxValue)]
        public int Amount { get; }

        [Range(1, int.MaxValue)]
        public int? ReceiptNumber { get; }

        public TransactionFields(
            int amount,
            int memberId,
            DateTime date,
            bool isShares,
            bool isContribution,
            int? receiptNumber,
            int? userId = null) : base(userId)
        {
            Amount = amount;
            MemberId = memberId;
            Date = date;
            IsShares = isShares;
            IsContribution = isContribution;
            ReceiptNumber = receiptNumber;
        }
    }
}
