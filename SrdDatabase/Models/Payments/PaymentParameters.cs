using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Payments
{
    public class PaymentParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [Range(1, int.MaxValue)]
        public int? ArchdeaconryId { get; }

        [Range(1, int.MaxValue)]
        public int? ParishId { get; }

        [Range(1, int.MaxValue)]
        public int? CongregationId { get; }

        [Range(1, int.MaxValue)]
        public int? ReceiptNumber { get; }

        public DateTime? StartDate { get; }

        public DateTime? EndDate { get; }

        public PaymentParameters(
            int? archdeaconryId = null,
            int? parishId = null,
            int? congregationId = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int? receiptNumber = null,
            int pageNumber = 0,
            int? pageSize = null,
            int? id = null) : base(pageNumber, pageSize)
        {
            Id = id;
            ArchdeaconryId = archdeaconryId;
            ParishId = parishId;
            CongregationId = congregationId;
            StartDate = startDate;
            EndDate = endDate;
            ReceiptNumber = receiptNumber;
        }
    }
}
