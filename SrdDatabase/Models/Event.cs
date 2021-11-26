﻿using System;

namespace SrdDatabase.Models
{
    public class Event
    {
        public int Id { get; }

        public sbyte EventTypeId { get; }

        public string EventType { get; }

        public int CongregationId { get; }

        public string Congregation { get; }

        public int ParishId { get; }

        public string Parish { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }

        public string FirstPersonName { get; }

        public string SecondPersonName { get; }

        public DateTime Date { get; }

        public Event(
            int id,
            sbyte eventTypeId,
            string eventType,
            int congregationId,
            string congregation,
            int parishId,
            string parish,
            int archdeaconryId,
            string archdeaconry,
            string firstPersonName,
            string secondPersonName,
            DateTime date)
        {
            Id = id;
            EventTypeId = eventTypeId;
            EventType = eventType;
            CongregationId = congregationId;
            Congregation = congregation;
            ParishId = parishId;
            Parish = parish;
            ArchdeaconryId = archdeaconryId;
            Archdeaconry = archdeaconry;
            FirstPersonName = firstPersonName;
            SecondPersonName = secondPersonName;
            Date = date;
        }

        // for Dapper
        public Event()
        {
        }
    }
}
