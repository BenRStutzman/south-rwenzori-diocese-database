namespace SrdDatabase.Models.Sacco.Loans
{
    public class LoanType
    {
        public sbyte Id { get; }

        public string Name { get; }

        public LoanType(
            sbyte id,
            string name)
        {
            Id = id;
            Name = name;
        }

        // for Dapper
        public LoanType()
        {
        }
    }
}
