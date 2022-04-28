using System.Text.Json.Serialization;

namespace SrdDatabase.Models.Sacco.Members
{
    public class Member
    {
        public int Id { get; set; }

        public string Name { get; set; }

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
