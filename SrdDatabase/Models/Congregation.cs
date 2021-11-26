namespace SrdDatabase.Models
{
    public class Congregation
    {
        public int Id { get; }

        public string Name { get; }

        public int ParishId { get; }

        public string Parish { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }

        public Congregation(
            int id,
            string name,
            int parishId,
            string parish,
            int archdeaconryId,
            string archdeaconry
            )
        {
            Id = id;
            Name = name;
            ParishId = parishId;
            Parish = parish;
            ArchdeaconryId = ArchdeaconryId;
            Archdeaconry = archdeaconry;
        }

        // for Dapper
        public Congregation()
        {
        }
    }
}
