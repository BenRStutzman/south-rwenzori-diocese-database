using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Loans
{
    public class LoanParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [Range(1, int.MaxValue)]
        public int? MemberId { get; }

        [Range(1, int.MaxValue)]
        public sbyte? LoanTypeId { get; }

        public DateTime? StartDate { get; }

        public DateTime? EndDate { get; }

        public bool? IsPaid { get; }

        public LoanParameters(
            int? memberId = null,
            sbyte? loanTypeId = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            bool? isPaid = null,
            int pageNumber = 0,
            string sortColumn = null,
            bool sortDescending = false,
            int? pageSize = null,
            int? id = null) : base(
                pageNumber,
                sortColumn,
                sortDescending,
                pageSize)
        {
            Id = id;
            MemberId = memberId;
            StartDate = startDate;
            EndDate = endDate;
            IsPaid = isPaid;
            LoanTypeId = loanTypeId;
        }
    }
}
