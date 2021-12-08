namespace SrdDatabase.Models.Authentication
{
    public class Request
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public Request(string username, string password)
        {
            Username = username;
            Password = password;
        }
    }
}
