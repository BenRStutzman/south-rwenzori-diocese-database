using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Events
{
    public class EventFields
    {
        [Range(1, int.MaxValue)]
        public byte EventTypeId { get; }

        [Range(1, int.MaxValue)]
        public int CongregationId { get; }

        [Required]
        [StringLength(50)]
        public string FirstPersonName { get; }

        [StringLength(50)]
        public string SecondPersonName { get; }

        [Required]
        public DateTime Date { get; }

        public EventFields(
            byte eventTypeId,
            int congregationId,
            string firstPersonName,
            string secondPersonName,
            DateTime date)
        {
            EventTypeId = eventTypeId;
            CongregationId = congregationId;
            FirstPersonName = firstPersonName;
            SecondPersonName = secondPersonName;
            Date = date;
        }
    }
}
