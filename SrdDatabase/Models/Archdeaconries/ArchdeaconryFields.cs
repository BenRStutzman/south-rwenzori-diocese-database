using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Archdeaconries
{
    public class ArchdeaconryFields
    {
        [Required]
        [StringLength(50)]
        public string Name { get; }

        public ArchdeaconryFields(string name)
        {
            Name = name;
        }
    }
}
