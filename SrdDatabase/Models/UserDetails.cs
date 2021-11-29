namespace SrdDatabase.Models
{
    public class UserDetails
    {
        public User User { get; }

        public UserDetails(User user)
        {
            User = user;
        }
    }

}
