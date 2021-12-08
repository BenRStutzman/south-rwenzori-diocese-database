namespace SrdDatabase.Models.Events
{
    public class Details
    {
        public Event Event { get; }

        public Details(Event baseEvent)
        {
            Event = baseEvent;
        }
    }

}
