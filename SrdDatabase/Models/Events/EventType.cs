namespace SrdDatabase.Models.Events
{
    public class EventType
    {
        public sbyte Id { get; }

        public string Name { get; }

        public bool AssociatedWithParish { get; }

        public bool InvolvesDescription { get; }

        public bool InvolvesFirstPerson { get; }

        public bool InvolvesSecondPerson { get; }

        public EventType(
            sbyte id,
            string name,
            bool associatedWithParish,
            bool involvesDescription,
            bool involvesFirstPerson,
            bool involvesSecondPerson)
        {
            Id = id;
            Name = name;
            AssociatedWithParish = associatedWithParish;
            InvolvesDescription = involvesDescription;
            InvolvesFirstPerson = involvesFirstPerson;
            InvolvesSecondPerson = involvesSecondPerson;
        }

        // for Dapper
        public EventType()
        {
        }
    }
}
