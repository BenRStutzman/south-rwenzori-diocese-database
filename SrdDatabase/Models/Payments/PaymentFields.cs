using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Payments
{
    public class PaymentFields : SaveFields
    {
        [Range(1, int.MaxValue)]
        public int CongregationId { get; }

        [Range(0, int.MaxValue)]
        public int AmountPerYear { get; }

        [Range(1, int.MaxValue)]
        public int StartYear { get; }

        [Range(1, int.MaxValue)]
        public int? EndYear { get; }

        public PaymentFields(
            int amountPerYear,
            int congregationId,
            int startYear,
            int? endYear,
            int? userId = null) : base(userId)
        {
            AmountPerYear = amountPerYear;
            StartYear = startYear;
            EndYear = endYear;
            CongregationId = congregationId;
        }
    }
}
