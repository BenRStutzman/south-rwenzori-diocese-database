using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Payments
{
    public class PaymentFields : SaveFields
    {
        [Range(1, int.MaxValue)]
        public int CongregationId { get; }

        [Range(1, int.MaxValue)]
        public int Amount { get; }

        [Required]
        public DateTime Date { get; }

        public PaymentFields(
            int amount,
            int congregationId,
            DateTime date,
            int? userId = null) : base(userId)
        {
            Amount = amount;
            Date = date;
            CongregationId = congregationId;
        }
    }
}
