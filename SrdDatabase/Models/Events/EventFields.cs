using SrdDatabase.Attributes;
using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Events
{
    [CongregationXOrParish]
    public class EventFields : SaveFields
    {
        [Range(1, int.MaxValue)]
        public byte EventTypeId { get; }

        [Required]
        public DateTime Date { get; }

        [Range(1, int.MaxValue)]
        public int? CongregationId { get; }

        [Range(1, int.MaxValue)]
        public int? ParishId { get; }

        [StringLength(50)]
        public string Description { get; }

        [StringLength(50)]
        public string FirstPersonName { get; }

        [StringLength(50)]
        public string SecondPersonName { get; }

        public EventFields(
            byte eventTypeId,
            DateTime date,
            int? congregationId,
            int? parishId,
            string description,
            string firstPersonName,
            string secondPersonName,
            int? userId = null) : base(userId)
        {
            EventTypeId = eventTypeId;
            Date = date;
            CongregationId = congregationId;
            ParishId = parishId;
            Description = description;
            FirstPersonName = firstPersonName;
            SecondPersonName = secondPersonName;
        }
    }
}
