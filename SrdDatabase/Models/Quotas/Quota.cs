namespace SrdDatabase.Models.Quotas
{
    public class Quota
    {
        public int Id { get; }

        public int AmountPerYear { get; }

        public int StartYear { get; }

        public int? EndYear { get; }

        public int CongregationId { get; }

        public string Congregation { get; }

        public int ParishId { get; }

        public string Parish { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }

        public Quota(
            int id,
            int amountPerYear,
            int startYear,
            int endYear,
            int congregationId,
            string congregation,
            int parishId,
            string parish,
            int archdeaconryId,
            string archdeaconry)
        {
            Id = id;
            AmountPerYear = amountPerYear;
            StartYear = startYear;
            EndYear = endYear;
            CongregationId = congregationId;
            Congregation = congregation;
            ParishId = parishId;
            Parish = parish;
            ArchdeaconryId = archdeaconryId;
            Archdeaconry = archdeaconry;
        }

        // for Dapper
        public Quota()
        {
        }
    }
}
