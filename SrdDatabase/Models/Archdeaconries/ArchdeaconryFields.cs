using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Archdeaconries
{
    public class ArchdeaconryFields : FieldsWithUserId
    {
        [Required]
        [StringLength(50)]
        public string Name { get; }

        public ArchdeaconryFields(string name, int? userId = null) : base(userId)
        {
            Name = name;
        }
    }
}
