using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Archdeaconries
{
    public class ArchdeaconryParameters
    {
        [StringLength(50)]
        public string Name { get; }

        public ArchdeaconryParameters(string name = null)
        {
            Name = name;
        }
    }
}
