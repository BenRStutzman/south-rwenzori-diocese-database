using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Congregations
{
    public class CongregationParameters
    {
        [StringLength(50)]
        public string Name { get; }

        [Range(1, int.MaxValue)]
        public int? ParishId { get; }

        [Range(1, int.MaxValue)]
        public int? ArchdeaconryId { get; }

        public CongregationParameters(
            string name = null,
            int? parishId = null,
            int? archdeaconryId = null)
        {
            Name = name;
            ParishId = parishId;
            ArchdeaconryId = archdeaconryId;
        }
    }
}
