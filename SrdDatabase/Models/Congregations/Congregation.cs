namespace SrdDatabase.Models.Congregations
{
    public class Congregation
    {
        public int Id { get; }

        public string Name { get; }

        public int ParishId { get; }

        public string Parish { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }

        public int? NumberOfChristians { get; }

        public int Quota { get; }

        public int Balance { get; }

        public Congregation(
            int id,
            string name,
            int parishId,
            string parish,
            int archdeaconryId,
            string archdeaconry,
            int? numberOfChristians,
            int quota,
            int balance
            )
        {
            Id = id;
            Name = name;
            ParishId = parishId;
            Parish = parish;
            ArchdeaconryId = archdeaconryId;
            Archdeaconry = archdeaconry;
            NumberOfChristians = numberOfChristians;
            Quota = quota;
            Balance = balance;
        }

        // for Dapper
        public Congregation()
        {
        }
    }
}
