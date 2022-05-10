using System;

namespace SrdDatabase.Models.Sacco.Installments
{
    public class Installment
    {
        public int Id { get; }

        public int LoanId { get; }

        public int MemberId { get; }

        public string Member { get; }

        public DateTime Date { get; }

        public int Amount { get; }

        public int? ReceiptNumber { get; }

        public Installment(
            int id,
            int loanId,
            int memberId,
            string member,
            DateTime date,
            int amount,
            int? receiptNumber)
        {
            Id = id;
            LoanId = loanId;
            MemberId = memberId;
            Member = member;
            Date = date;
            Amount = amount;
            ReceiptNumber = receiptNumber;
        }

        // for Dapper
        public Installment()
        {
        }
    }
}
