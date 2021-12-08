namespace SrdDatabase.Models.Events
{
    public class EventType
    {
        public sbyte Id { get; }

        public string Name { get; }

        public bool InvolvesTwoPeople { get; }

        public EventType(sbyte id, string name, bool involvesTwoPeople)
        {
            Id = id;
            Name = name;
            InvolvesTwoPeople = involvesTwoPeople;
        }

        // for Dapper
        public EventType()
        {
        }
    }
}
