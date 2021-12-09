using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Users
{
    public class UserParameters
    {
        [Range(1, int.MaxValue)]
        public byte? UserTypeId { get; }

        [StringLength(50)]
        public string Name { get; }

        [StringLength(50)]
        public string Username { get; }


        public UserParameters(
            byte? userTypeId = null,
            string name = null,
            string username = null)
        {
            UserTypeId = userTypeId;
            Name = name;
            Username = username;
        }
    }
}
