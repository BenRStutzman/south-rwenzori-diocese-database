using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Congregations
{
    public class CongregationParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [StringLength(50)]
        public string Name { get; }

        [Range(1, int.MaxValue)]
        public int? ParishId { get; }

        [Range(1, int.MaxValue)]
        public int? ArchdeaconryId { get; }

        public CongregationParameters(
            string name = null,
            int? parishId = null,
            int? archdeaconryId = null,
            int pageNumber = 0,
            int? pageSize = null,
            int? id = null) : base(pageNumber, pageSize)
        {
            Id = id;
            Name = name;
            ParishId = parishId;
            ArchdeaconryId = archdeaconryId;
        }
    }
}
