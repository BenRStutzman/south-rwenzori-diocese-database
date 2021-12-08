using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Data.Queries
{
    public class GetUsers
    {
        public class Query : IRequest<UserResults>
        {
            public int? Id { get; }

            public byte? UserTypeId { get; }

            public string Name { get; }

            public string Username { get; }

            public int PageNumber { get; }

            public int? PageSize { get; }

            public Query(
                UserParameters parameters = null,
                int? id = null,
                int pageNumber = 0,
                int? pageSize = null)
            {
                Id = id;
                UserTypeId = parameters.UserTypeId;
                Name = parameters.Name;
                Username = parameters.Username;
                PageNumber = pageNumber;
                PageSize = pageSize;
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
