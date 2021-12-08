using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Data.Queries
{
    public class GetUserTypes
    {
        public class Query : IRequest<IEnumerable<UserType>>
        {
            public Query()
            {
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<UserType>>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_user_types";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<IEnumerable<UserType>> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QueryAsync<UserType>(
                    _storedProcedure,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
