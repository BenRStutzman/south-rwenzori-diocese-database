using System;

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

        public int Principal { get; }

        public int Interest { get; }

        public int TotalDue { get; }

        public int PrincipalPaid { get; }

        public int InterestPaid { get; }

        public int TotalPaid { get; }

        public int Balance { get; }

        public short PercentagePaid { get; }

        public bool IsPaid { get; }

        public Installment(
            int id,
            int loanId,
            string loan,
            int memberId,
            string member,
            sbyte installmentNumber,
            DateTime dateDue,
            int principal,
            int interest,
            int totalDue,
            int principalPaid,
            int interestPaid,
            int totalPaid,
            int balance,
            short percentagePaid,
            bool isPaid
            )
        {
            Id = id;
            LoanId = loanId;
            Loan = loan;
            MemberId = memberId;
            Member = member;
            InstallmentNumber = installmentNumber;
            DateDue = dateDue;
            Principal = principal;
            Interest = interest;
            TotalDue = totalDue;
            PrincipalPaid = principalPaid;
            InterestPaid = interestPaid;
            TotalPaid = totalPaid;
            Balance = balance;
            PercentagePaid = percentagePaid;
            IsPaid = isPaid;
        }

        // for Dapper
        public Installment()
        {
        }
    }
}
