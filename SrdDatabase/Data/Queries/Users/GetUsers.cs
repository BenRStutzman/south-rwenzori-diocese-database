using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Data.Queries.Users
{
    public class GetUsers
    {
        public class Query : UserParameters, IRequest<UserResults>
        {
            public Query(
                int? id = null,
                byte? userTypeId = null,
                string name = null,
                string username = null,
                bool hideRoot = false,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base (userTypeId,
                      name,
                      username,
                      hideRoot,
                      pageNumber,
                      sortColumn,
                      sortDescending,
                      pageSize,
                      id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, UserResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_users";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<UserResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var users = results.Read<User>();

                return new UserResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    users);
            }
        }
    }
}
