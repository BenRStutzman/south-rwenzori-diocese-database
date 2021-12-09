using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Users
{
    public class UserFields
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
            string username)
        {
            Name = name;
            Username = username;
            UserTypeId = userTypeId;
        }
    }
}
