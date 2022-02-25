namespace SrdDatabase.Models.Parishes
{
    public class Parish
    {
        public int Id { get; }

        public string Name { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }

        public int? NumberOfChristians { get; }

        public int Balance { get; }
        
        public Parish(
            int id,
            string name,
            int archdeaconryId,
            string archdeaconry,
            int? numberOfChristians,
            int balance)
        {
            Id = id;
            Name = name;
            ArchdeaconryId = archdeaconryId;
            Archdeaconry = archdeaconry;
            NumberOfChristians = numberOfChristians;
            Balance = balance;
        }

        // for Dapper
        public Parish()
        {
        }
    }
}
