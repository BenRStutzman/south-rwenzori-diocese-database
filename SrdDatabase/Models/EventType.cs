namespace SrdDatabase.Models
{
    public class EventType
    {
        public sbyte Id { get; }

        public string Name { get; }

        public EventType(sbyte id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
