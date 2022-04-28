using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Members
{
    public class MemberFields : SaveFields
    {
        [Required]
        [StringLength(50)]
        public string Name { get; }

        public MemberFields(
            string name,
            int? userId = null) : base(userId)
        {
            Name = name;
        }
    }
}
