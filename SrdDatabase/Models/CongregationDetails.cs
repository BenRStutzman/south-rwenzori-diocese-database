﻿
using System.Collections.Generic;

namespace SrdDatabase.Models
{
    public class CongregationDetails
    {
        public Congregation Congregation { get; }

        public IEnumerable<Event> RecentEvents { get; }

        public CongregationDetails(
            Congregation congregation,
            IEnumerable<Event> recentEvents)
        {
            Congregation = congregation;
            RecentEvents = recentEvents;
        }
    }

}