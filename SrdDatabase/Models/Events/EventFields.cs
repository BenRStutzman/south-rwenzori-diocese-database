using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Events
{
    public class EventFields : SaveFields
    {
        [Range(1, int.MaxValue)]
        public byte EventTypeId { get; }

        [Range(1, int.MaxValue)]
        public int CongregationId { get; }

        [StringLength(50)]
        public string FirstPersonName { get; }

        [StringLength(50)]
        public string SecondPersonName { get; }

        [StringLength(50)]
        public string Description { get; }

        [Required]
        public DateTime Date { get; }

        public EventFields(
            byte eventTypeId,
            int congregationId,
            string firstPersonName,
            string secondPersonName,
            string description,
            DateTime date,
            int? userId = null) : base(userId)
        {
            EventTypeId = eventTypeId;
            CongregationId = congregationId;
            FirstPersonName = firstPersonName;
            SecondPersonName = secondPersonName;
            Description = description;
            Date = date;
        }
    }
}
