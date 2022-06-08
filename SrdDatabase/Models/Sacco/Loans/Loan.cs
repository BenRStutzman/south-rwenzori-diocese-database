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

        public DateTime DateOfExpiry { get; }

        public sbyte TermMonths { get; }

        public int Principal { get; }

        public int InterestPerMonth { get; }

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
            DateTime dateOfExpiry,
            sbyte termMonths,
            int principal,
            int interestPerMonth,
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
            DateOfExpiry = dateOfExpiry;
            TermMonths = termMonths;
            Principal = principal;
            InterestPerMonth = interestPerMonth;
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
