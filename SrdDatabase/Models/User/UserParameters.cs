namespace SrdDatabase.Models.Users
{
    public class UserParameters
    {
        public byte? UserTypeId { get; }

        public string Name { get; }

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
