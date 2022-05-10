﻿using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.LoanInstallments
{
    public class LoanInstallmentParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [Range(1, int.MaxValue)]
        public int? MemberId { get; }

        [Range(1, int.MaxValue)]
        public int? ReceiptNumber { get; }

        public DateTime? StartDate { get; }

        public DateTime? EndDate { get; }

        public LoanInstallmentParameters(
            int? memberId = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int? receiptNumber = null,
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
            ReceiptNumber = receiptNumber;
        }
    }
}
