using System;

namespace SrdDatabase.Models.Payments
{
    public class Payment
    {
        public int Id { get; }

        public int Amount { get; }

        public DateTime Date { get; }

        public int CongregationId { get; }

        public string Congregation { get; }

        public int ParishId { get; }

        public string Parish { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }

        public Payment(
            int id,
            int amountPerYear,
            DateTime date,
            int congregationId,
            string congregation,
            int parishId,
            string parish,
            int archdeaconryId,
            string archdeaconry)
        {
            Id = id;
            Amount = amountPerYear;
            Date = date,
            CongregationId = congregationId;
            Congregation = congregation;
            ParishId = parishId;
            Parish = parish;
            ArchdeaconryId = archdeaconryId;
            Archdeaconry = archdeaconry;
        }

        // for Dapper
        public Payment()
        {
        }
    }
}
