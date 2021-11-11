using SrdDatabase.Models.User;
using System.Collections.Generic;

namespace SrdDatabase.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest request);

        IEnumerable<User> GetAll();

        User GetById(int id);
    }
}
