using System;

namespace SouthRwenzoriDioceseDatabase.Models
{
    public class Event
    {
        public int Id { get; }

        public string EventType { get; }

        public string Congregation { get; }

        public string PersonName { get; }

        public DateTime Date { get; }

        public Event(
            int id,
            string eventType,
            string congregation,
            string personName,
            DateTime date)
        {
            Id = id;
            EventType = eventType;
            Congregation = congregation;
            PersonName = personName;
            Date = date;
        }

        // for Dapper
        public Event()
        {
        }
    }
}
