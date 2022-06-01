using System;
using System.Collections.Generic;

namespace SrdDatabase.Models.Sacco.Installments
{
    public class Installment
    {
        public int Id { get; }

        public int LoanId { get; }

        public string Loan { get; }

        public int MemberId { get; }

        public string Member { get; }

        public sbyte InstallmentNumber { get; }

        public DateTime DateDue { get; }

        public bool IsPaid { get; }

        public DateTime DatePaid { get; }

        public int DaysLate { get; }

        public int? ReceiptNumber { get; }

        public int Principal { get; }

        public int Interest { get; }

        public int BaseDue { get; }

        public int FineDue { get; }

        public int TotalDue { get; }

        public Installment(
            int id,
            int loanId,
            string loan,
            int memberId,
            string member,
            sbyte installmentNumber,
            DateTime dateDue,
            bool isPaid,
            DateTime datePaid,
            int daysLate,
            int? receiptNumber,
            int principal,
            int interest,
            int baseDue,
            int fineDue,
            int totalDue)
        {
            Id = id;
            LoanId = loanId;
            Loan = loan;
            MemberId = memberId;
            Member = member;
            InstallmentNumber = installmentNumber;
            DateDue = dateDue;
            IsPaid = isPaid;
            DatePaid = datePaid;
            DaysLate = daysLate;
            ReceiptNumber = receiptNumber;
            Principal = principal;
            Interest = interest;
            BaseDue = baseDue;
            FineDue = fineDue;
            TotalDue = totalDue;
        }

        // for Dapper
        public Installment()
        {
        }
    }
}
