using SrdDatabase.Models.Users;

namespace SrdDatabase.Models.Authentication
{
    public class Response
    {
        public User User { get; set; }

        public string Token { get; set; }

        public Response(User user, string token)
        {
            User = user;
            Token = token;
        }
    }
}
