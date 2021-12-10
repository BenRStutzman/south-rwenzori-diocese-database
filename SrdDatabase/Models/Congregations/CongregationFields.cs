using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Congregations
{
    public class CongregationFields : SaveFields
    {
        [Required]
        [StringLength(50)]
        public string Name { get; }

        [Range(1, int.MaxValue)]
        public int ParishId { get; }

        public CongregationFields(string name, int parishId, int? userId = null)
            : base(userId)
        {
            Name = name;
            ParishId = parishId;
        }
    }
}
