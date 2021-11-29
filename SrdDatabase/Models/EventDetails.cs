namespace SrdDatabase.Models
{
    public class EventDetails
    {
        public Event Event { get; }

        public EventDetails(Event baseEvent)
        {
            Event = baseEvent;
        }
    }

}
