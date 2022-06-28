using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Installments
{
    public class InstallmentParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [Range(1, int.MaxValue)]
        public int? LoanId { get; }

        [Range(1, int.MaxValue)]
        public int? MemberId { get; }

        public InstallmentParameters(
            int? loanId = null,
            int? memberId = null,
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
            LoanId = loanId;
            MemberId = memberId;
        }
    }
}
