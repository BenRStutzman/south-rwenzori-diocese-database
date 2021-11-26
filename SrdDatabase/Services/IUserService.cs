using SrdDatabase.Models;
using System.Threading.Tasks;

namespace SrdDatabase.Services
{
    public interface IUserService
    {
        Task<AuthenticationResponse> Authenticate(AuthenticationRequest request);

        Task<User> GetUserFromToken(string token);
    }
}
