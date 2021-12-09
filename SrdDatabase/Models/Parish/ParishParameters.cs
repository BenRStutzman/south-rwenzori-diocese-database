using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Parishes
{
    public class ParishParameters
    {
        [StringLength(50)]
        public string Name { get; }

        [Range(1, int.MaxValue)]
        public int? ArchdeaconryId { get; }

        public ParishParameters(string name = null, int? archdeaconryId = null)
        {
            Name = name;
            ArchdeaconryId = archdeaconryId;
        }
    }
}
