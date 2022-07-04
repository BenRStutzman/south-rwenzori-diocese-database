using System;

namespace SrdDatabase.Models.Sacco.Payments
{
    public class Payment
    {
        public int Id { get; }

        public int LoanId { get; }

        public string Loan { get; }

        public int MemberId { get; }

        public string Member { get; }
        
        public int AccountNumber { get; }

        public DateTime Date { get; }

        public int Amount { get; }

        public int? ReceiptNumber { get; }

        public int Principal { get; }

        public int Interest { get; }

        public int FinePaid { get; }

        public int FineIncurred { get; }

        public string CreatedBy { get; }

        public string UpdatedBy { get; }

        public Payment(
            int id,
            int loanId,
            string loan,
            int memberId,
            string member,
            int accountNumber,
            DateTime date,
            int amount,
            int? receiptNumber,
            int principal,
            int interest,
            int finePaid,
            int fineIncurred,
            string createdBy,
            string updatedBy)
        {
            Id = id;
            LoanId = loanId;
            Loan = loan;
            MemberId = memberId;
            Member = member;
            AccountNumber = accountNumber;
            Date = date;
            Amount = amount;
            ReceiptNumber = receiptNumber;
            Principal = principal;
            Interest = interest;
            FinePaid = finePaid;
            FineIncurred = fineIncurred;
            CreatedBy = createdBy;
            UpdatedBy = updatedBy;
        }

        // for Dapper
        public Payment()
        {
        }
    }
}
