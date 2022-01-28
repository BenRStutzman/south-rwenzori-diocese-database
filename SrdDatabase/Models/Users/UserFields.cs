using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Users
{
    public class UserFields : SaveFields
    {
        [Required]
        [StringLength(50)]
        public string Name { get; }

        [Required]
        [StringLength(50)]
        public string Username { get; }

        [Range(1, int.MaxValue)]
        public byte UserTypeId { get; }

        public UserFields(
            byte userTypeId,
            string name,
            string username,
            int? userId = null) : base(userId)
        {
            Name = name;
            Username = username;
            UserTypeId = userTypeId;
        }
    }
}
