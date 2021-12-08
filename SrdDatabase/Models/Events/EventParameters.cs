using System;

namespace SrdDatabase.Models.Events
{
    public class EventParameters
    {
        public byte? EventTypeId { get; }

        public int? ArchdeaconryId { get; }

        public int? ParishId { get; }

        public int? CongregationId { get; }

        public string PersonName { get; }

        public DateTime? StartDate { get; }

        public DateTime? EndDate { get; }

        public EventParameters(
            byte? eventTypeId = null,
            int? archdeaconryId = null,
            int? parishId = null,
            int? congregationId = null,
            string personName = null,
            DateTime? startDate = null,
            DateTime? endDate = null)
        {
            EventTypeId = eventTypeId;
            ArchdeaconryId = archdeaconryId;
            ParishId = parishId;
            CongregationId = congregationId;
            PersonName = personName;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
