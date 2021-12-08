using SrdDatabase.Models.Authentication;
using SrdDatabase.Models.Users;
using System.Threading.Tasks;

namespace SrdDatabase.Services
{
    public interface IUserService
    {
        Task<Response> Authenticate(Request request);

        Task<User> GetUserFromToken(string token);
    }
}
