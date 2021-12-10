namespace SrdDatabase.Models.Transactions
{
    public class TransactionType
    {
        public sbyte Id { get; }

        public string Name { get; }

        public TransactionType(sbyte id, string name)
        {
            Id = id;
            Name = name;
        }

        // for Dapper
        public TransactionType()
        {
        }
    }
}
