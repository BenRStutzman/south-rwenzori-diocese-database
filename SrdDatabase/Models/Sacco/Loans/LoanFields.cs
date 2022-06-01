using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Loans
{
    public class LoanFields : FieldsWithUserId
    {
        [Range(1, int.MaxValue)]
        public int MemberId { get; }

        [Range(1, sbyte.MaxValue)]
        public sbyte LoanTypeId { get; }

        [Required]
        public DateTime DateDisbursed { get; }

        [Range(1, int.MaxValue)]
        public int Principal { get; }

        [Range(1, sbyte.MaxValue)]
        public sbyte TermMonths { get; }

        public LoanFields(
            int principal,
            int memberId,
            sbyte loanTypeId,
            DateTime dateDisbursed,
            sbyte termMonths,
            int? userId = null) : base(userId)
        {
            Principal = principal;
            MemberId = memberId;
            LoanTypeId = loanTypeId;
            DateDisbursed = dateDisbursed;
            TermMonths = termMonths;
        }
    }
}
