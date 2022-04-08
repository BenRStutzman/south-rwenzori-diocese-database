using System;

namespace SrdDatabase.Models.Censuses
{
    public class Census
    {
        public int Id { get; }

        public int NumberOfChristians { get; }

        public int Males0To12 { get; }

        public int Females0To12 { get; }

        public int Males13To17 { get; }

        public int Females13To17 { get; }

        public int Males18To35 { get; }

        public int Females18To35 { get; }

        public int Males36AndAbove { get; }

        public int Females36AndAbove { get; }

        public DateTime Date { get; }

        public int CongregationId { get; }

        public string Congregation { get; }

        public int ParishId { get; }

        public string Parish { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }

        public int CreatedBy { get; }

        public Census(
            int id,
            int males0To12,
            int females0To12,
            int males13To17,
            int females13To17,
            int males18To35,
            int females18To35,
            int males36AndAbove,
            int females36AndAbove,
            DateTime date,
            int congregationId,
            string congregation,
            int parishId,
            string parish,
            int archdeaconryId,
            string archdeaconry,
            int createdBy)
        {
            Id = id;
            NumberOfChristians = males0To12 + females0To12 + males13To17 + females13To17
                + males18To35 + females18To35 + males36AndAbove + females36AndAbove;
            Males0To12 = males0To12;
            Females0To12 = females0To12;
            Males13To17 = males13To17;
            Females13To17 = females13To17;
            Males18To35 = males18To35;
            Females18To35 = females18To35;
            Males36AndAbove = males36AndAbove;
            Females36AndAbove = females36AndAbove;
            Date = date;
            CongregationId = congregationId;
            Congregation = congregation;
            ParishId = parishId;
            Parish = parish;
            ArchdeaconryId = archdeaconryId;
            Archdeaconry = archdeaconry;
            CreatedBy = createdBy;
        }

        // for Dapper
        public Census()
        {
        }
    }
}
