using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Payments
{
    public class PaymentFields : FieldsWithUserId
    {
        [Range(1, int.MaxValue)]
        public int LoanId { get; }

        [Required]
        public DateTime Date { get; }

        [Range(1, int.MaxValue)]
        public int Amount { get; }

        [Range(1, int.MaxValue)]
        public int? ReceiptNumber { get; }

        public PaymentFields(
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
