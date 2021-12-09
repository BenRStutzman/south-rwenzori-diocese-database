using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Events
{
    public class EventParameters
    {
        [Range(1, int.MaxValue)]
        public byte? EventTypeId { get; }

        [Range(1, int.MaxValue)]
        public int? ArchdeaconryId { get; }

        [Range(1, int.MaxValue)]
        public int? ParishId { get; }

        [Range(1, int.MaxValue)]
        public int? CongregationId { get; }
        
        [StringLength(50)]
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
