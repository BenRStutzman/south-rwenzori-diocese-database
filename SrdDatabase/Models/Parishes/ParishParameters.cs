using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Parishes
{
    public class ParishParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [StringLength(50)]
        public string Name { get; }

        [Range(1, int.MaxValue)]
        public int? ArchdeaconryId { get; }

        public ParishParameters(
            string name = null,
            int? archdeaconryId = null,
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
            Name = name;
            ArchdeaconryId = archdeaconryId;
        }
    }
}
