using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Users
{
    public class UserParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [Range(1, int.MaxValue)]
        public byte? UserTypeId { get; }

        [StringLength(50)]
        public string Name { get; }

        [StringLength(50)]
        public string Username { get; }


        public UserParameters(
            byte? userTypeId = null,
            string name = null,
            string username = null,
            int pageNumber = 0,
            int? pageSize = null,
            int? id = null) : base(pageNumber, pageSize)
        {
            Id = id;
            UserTypeId = userTypeId;
            Name = name;
            Username = username;
        }
    }
}
