using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Parishes
{
    public class ParishFields
    {
        [Required]
        [StringLength(50)]
        public string Name { get; }

        [Range(1, int.MaxValue)]
        public int ArchdeaconryId { get; }

        public ParishFields(string name, int archdeaconryId)
        {
            Name = name;
            ArchdeaconryId = archdeaconryId;
        }
    }
}
