using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;

namespace SrdDatabase.Data.Queries.Diocese
{
    public class GetDioceseNumberOfChristians
    {
        public class Query : IRequest<int?>
        {
        }

        public class Handler : IRequestHandler<Query, int?>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_diocese_number_of_christians";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<int?> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QuerySingleAsync<int?>(
                    _storedProcedure,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
