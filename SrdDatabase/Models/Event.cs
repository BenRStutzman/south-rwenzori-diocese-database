﻿using System;

namespace SrdDatabase.Models
{
    public class Event
    {
        public int Id { get; }

        public byte EventTypeId { get; }

        public string EventType { get; }

        public int CongregationId { get; }

        public string Congregation { get; }

        public string Parish { get; }
        
        public string Archdeaconry { get; }

        public string PersonName { get; }

        public DateTime Date { get; }

        public Event(
            int id,
            byte eventTypeId,
            string eventType,
            int congregationId,
            string congregation,
            string parish,
            string archdeaconry,
            string personName,
            DateTime date)
        {
            Id = id;
            EventTypeId = eventTypeId;
            EventType = eventType;
            CongregationId = congregationId;
            Congregation = congregation;
            Parish = parish;
            Archdeaconry = archdeaconry;
            PersonName = personName;
            Date = date;
        }

        // for Dapper
        public Event()
        {
        }
    }
}
