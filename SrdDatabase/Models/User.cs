using System.Text.Json.Serialization;

namespace SrdDatabase.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        public byte UserTypeId { get; set; }

        public string UserType { get; set; }

        public User(
            int id,
            string name,
            string username,
            string password,
            byte userTypeId,
            string userType)
        {
            Id = id;
            Name = name;
            Username = username;
            Password = password;
            UserTypeId = userTypeId;
            UserType = userType;
        }

        // for Dapper
        public User()
        {
        }
    }
}
