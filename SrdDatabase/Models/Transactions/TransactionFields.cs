using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Transactions
{
    public class TransactionFields : SaveFields
    {
        [Range(1, int.MaxValue)]
        public byte TransactionTypeId { get; }

        [Range(1, int.MaxValue)]
        public int CongregationId { get; }

        [Required]
        public int Amount { get; }

        [Required]
        public DateTime Date { get; }

        public TransactionFields(
            byte transactionTypeId,
            int amount,
            int congregationId,
            DateTime date,
            int? userId = null) : base(userId)
        {
            TransactionTypeId = transactionTypeId;
            Amount = amount;
            CongregationId = congregationId;
            Date = date;
        }
    }
}
