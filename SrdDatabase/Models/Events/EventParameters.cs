using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Events
{
    public class EventParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [Range(1, int.MaxValue)]
        public sbyte? EventTypeId { get; }

        [Range(1, int.MaxValue)]
        public int? ArchdeaconryId { get; }

        [Range(1, int.MaxValue)]
        public int? ParishId { get; }

        [Range(1, int.MaxValue)]
        public int? CongregationId { get; }

        [StringLength(50)]
        public string Description { get; }

        [StringLength(50)]
        public string PersonName { get; }

        public DateTime? StartDate { get; }

        public DateTime? EndDate { get; }

        public EventParameters(
            sbyte? eventTypeId = null,
            int? archdeaconryId = null,
            int? parishId = null,
            int? congregationId = null,
            string description = null,
            string personName = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int pageNumber = 0,
            string sortColumn = null,
            bool sortDescending = false,
            int? pageSize = null,
            int? id = null) : base(
                pageNumber,
                sortColumn,
                sortDescending,
                pageSize)
        {
            Id = id;
            EventTypeId = eventTypeId;
            ArchdeaconryId = archdeaconryId;
            ParishId = parishId;
            CongregationId = congregationId;
            Description = description;
            PersonName = personName;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
