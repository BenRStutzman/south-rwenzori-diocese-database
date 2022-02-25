namespace SrdDatabase.Models.Archdeaconries
{
    public class Archdeaconry
    {
        public int Id { get; }

        public string Name { get;  }

        public int? NumberOfChristians { get; }

        public int Quota { get; }

        public int Balance { get; }
        
        public Archdeaconry(
            int id,
            string name,
            int? numberOfChristians,
            int quota,
            int balance)
        {
            Id = id;
            Name = name;
            NumberOfChristians = numberOfChristians;
            Quota = quota;
            Balance = balance;
        }

        // for Dapper
        public Archdeaconry()
        {
        }
    }
}
