namespace SrdDatabase.Models.Sacco.Members
{
    public class Member
    {
        public int Id { get; }

        public string Name { get; }

        public Member(
            int id,
            string name)
        {
            Id = id;
            Name = name;
        }

        // for Dapper
        public Member()
        {
        }
    }
}
