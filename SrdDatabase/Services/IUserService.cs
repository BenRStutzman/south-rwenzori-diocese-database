using SrdDatabase.Data.Queries;
using SrdDatabase.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SrdDatabase.Services
{
    public interface IUserService
    {
        Task<AuthenticationResponse> Authenticate(AuthenticateUser.Query query);

        IEnumerable<User> GetAll();

        User GetById(int id);
    }
}
