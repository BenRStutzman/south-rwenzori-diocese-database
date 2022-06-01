using System;

namespace SrdDatabase.Models.Sacco.Loans
{
    public class Loan
    {
        public int Id { get; }

        public int MemberId { get; }

        public string Member { get; }

        public sbyte LoanTypeId { get; }

        public string LoanType { get; }

        public DateTime DateDisbursed { get; }

        public sbyte TermMonths { get; }

        public int Principal { get; }

        public int Interest { get; }

        public int BaseDue { get; }

        public int FinesDue { get; }

        public int TotalDue { get; }

        public int AmountPaid { get; }

        public sbyte PercentagePaid { get; }

        public bool IsPaid { get; }

        public Loan(
            int id,
            int memberId,
            string member,
            sbyte loanTypeId,
            string loanType,
            DateTime dateDisbursed,
            sbyte termMonths,
            int principal,
            int interest,
            int baseDue,
            int finesDue,
            int totalDue,
            int amountPaid,
            sbyte percentagePaid,
            bool isPaid)
        {
            Id = id;
            MemberId = memberId;
            Member = member;
            LoanTypeId = loanTypeId;
            LoanType = loanType;
            DateDisbursed = dateDisbursed;
            TermMonths = termMonths;
            Principal = principal;
            Interest = interest;
            BaseDue = baseDue;
            FinesDue = finesDue;
            TotalDue = totalDue;
            AmountPaid = amountPaid;
            PercentagePaid = percentagePaid;
            IsPaid = isPaid;
        }

        // for Dapper
        public Loan()
        {
        }
    }
}
