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

        public DateTime Date { get; }

        public sbyte TermMonths { get; }

        public int Principal { get; }

        public Loan(
            int id,
            int memberId,
            string member,
            sbyte loanTypeId,
            string loanType,
            DateTime date,
            sbyte termMonths,
            int principal)
        {
            Id = id;
            MemberId = memberId;
            Member = member;
            LoanTypeId = loanTypeId;
            LoanType = loanType;
            Date = date;
            TermMonths = termMonths;
            Principal = principal;
        }

        // for Dapper
        public Loan()
        {
        }
    }
}
