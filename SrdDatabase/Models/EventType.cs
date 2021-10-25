namespace SrdDatabase.Models
{
    public class EventType
    {
        public byte Id { get; }

        public string Name { get; }

        public EventType(byte id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
