using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Installments
{
    public class InstallmentFields : FieldsWithUserId
    {
        public DateTime? DatePaid { get; }

        [Range(1, int.MaxValue)]
        public int? ReceiptNumber { get; }

        public InstallmentFields(
            DateTime? datePaid,
            int? receiptNumber,
            int? userId = null) : base(userId)
        {
            DatePaid = datePaid;
            ReceiptNumber = receiptNumber;
        }
    }
}
