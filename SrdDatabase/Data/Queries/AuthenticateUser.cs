using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.User;

namespace SrdDatabase.Data.Queries
{
    public class AuthenticateUser
    {
        public class Query : IRequest<User>
        {
            public string Username { get; }

            public string PasswordHash { get; }

            public Query(string username, string password)
            {
                Username = username;
                PasswordHash = password;
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_authenticate_user";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                try
                {
                    return await connection.QuerySingleAsync<User>(
                        _storedProcedure,
                        request,
                        commandType: CommandType.StoredProcedure);
                }
                catch
                {
                    // No user with the provided username and password
                    return null;
                }
            }
        }
    }
}
