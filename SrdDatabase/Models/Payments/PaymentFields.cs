﻿using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Payments
{
    public class PaymentFields : FieldsWithUserId
    {
        [Range(1, int.MaxValue)]
        public int CongregationId { get; }

        [Range(1, int.MaxValue)]
        public int Amount { get; }

        [Required]
        public DateTime Date { get; }

        [Range(1, int.MaxValue)]
        public int? ReceiptNumber { get; }

        public PaymentFields(
            int amount,
            int congregationId,
            DateTime date,
            int? receiptNumber,
            int? userId = null) : base(userId)
        {
            Amount = amount;
            Date = date;
            CongregationId = congregationId;
            ReceiptNumber = receiptNumber;
        }
    }
}
