using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Transactions
{
    public class TransactionFields : FieldsWithUserId
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

        [StringLength(50)]
        public string Notes { get; }

        public TransactionFields(
            int amount,
            int memberId,
            DateTime date,
            bool isShares,
            bool isContribution,
            int? receiptNumber,
            string notes,
            int? userId = null) : base(userId)
        {
            Amount = amount;
            MemberId = memberId;
            Date = date;
            IsShares = isShares;
            IsContribution = isContribution;
            ReceiptNumber = receiptNumber;
            Notes = notes;
        }
    }
}
