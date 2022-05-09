namespace SrdDatabase.Models.Sacco.Members
{
    public class Member
    {
        public int Id { get; }

        public int AccountNumber { get; }

        public string Name { get; }

        public Member(
            int id,
            int accountNumber,
            string name)
        {
            Id = id;
            AccountNumber = accountNumber;
            Name = name;
        }

        // for Dapper
        public Member()
        {
        }
    }
}
