using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Installments
{
    public class InstallmentFields : FieldsWithUserId
    {
        [Range(1, int.MaxValue)]
        public int LoanId { get; }

        [Required]
        public DateTime Date { get; }

        [Range(1, int.MaxValue)]
        public int Amount { get; }

        [Range(1, int.MaxValue)]
        public int? ReceiptNumber { get; }

        public InstallmentFields(
            int amount,
            int loanId,
            DateTime date,
            int? receiptNumber,
            int? userId = null) : base(userId)
        {
            Amount = amount;
            LoanId = loanId;
            Date = date;
            ReceiptNumber = receiptNumber;
        }
    }
}
