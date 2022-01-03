using System;

namespace SrdDatabase.Models.Transactions
{
    public class Transaction
    {
        public int Id { get; }

        public sbyte TransactionTypeId { get; }

        public string TransactionType { get; }

        public bool IsPayment { get; }

        public int Amount { get; }

        public int CongregationId { get; }

        public string Congregation { get; }

        public int ParishId { get; }

        public string Parish { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }

        public DateTime Date { get; }

        public Transaction(
            int id,
            int amount,
            sbyte transactionTypeId,
            string transationType,
            bool isPayment,
            int congregationId,
            string congregation,
            int parishId,
            string parish,
            int archdeaconryId,
            string archdeaconry,
            DateTime date)
        {
            Id = id;
            Amount = amount;
            TransactionTypeId = transactionTypeId;
            TransactionType = transationType;
            IsPayment = isPayment;
            CongregationId = congregationId;
            Congregation = congregation;
            ParishId = parishId;
            Parish = parish;
            ArchdeaconryId = archdeaconryId;
            Archdeaconry = archdeaconry;
            Date = date;
        }

        // for Dapper
        public Transaction()
        {
        }
    }
}
