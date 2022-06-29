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

        public int PrincipalPerInstallment { get; }

        public int PrincipalDue { get; }

        public int InterestPerInstallment { get; }

        public sbyte MonthsOfInterest { get; }

        public int Interest { get; }

        public int Fines { get; }

        public int TotalDue { get; }

        public int PrincipalPaid { get; }

        public int InterestPaid {get;}

        public int FinesPaid { get;}

        public int TotalPaid { get; }

        public int Balance { get; }

        public short PercentagePaid { get; }

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
            int principalPerInstallment,
            int principalDue,
            int interestPerInstallment,
            sbyte monthsOfInterest,
            int interest,
            int fines,
            int totalDue,
            int principalPaid,
            int interestPaid,
            int finesPaid,
            int totalPaid,
            int balance,
            short percentagePaid,
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
            PrincipalPerInstallment = principalPerInstallment;
            PrincipalDue = principalDue;
            InterestPerInstallment = interestPerInstallment;
            MonthsOfInterest = monthsOfInterest;
            Interest = interest;
            Fines = fines;
            TotalDue = totalDue;
            PrincipalPaid = principalPaid;
            InterestPaid = interestPaid;
            FinesPaid = finesPaid;
            TotalPaid = totalPaid;
            Balance = balance;
            PercentagePaid = percentagePaid;
            IsPaid = isPaid;
        }

        // for Dapper
        public Loan()
        {
        }
    }
}
