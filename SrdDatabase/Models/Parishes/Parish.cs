namespace SrdDatabase.Models.Parishes
{
    public class Parish
    {
        public int Id { get; }

        public string Name { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }

        public int? NumberOfChristians { get; }

        public long Quota { get; }

        public long Balance { get; }
        
        public Parish(
            int id,
            string name,
            int archdeaconryId,
            string archdeaconry,
            int? numberOfChristians,
            long quota,
            long balance)
        {
            Id = id;
            Name = name;
            ArchdeaconryId = archdeaconryId;
            Archdeaconry = archdeaconry;
            NumberOfChristians = numberOfChristians;
            Quota = quota;
            Balance = balance;
        }

        // for Dapper
        public Parish()
        {
        }
    }
}
