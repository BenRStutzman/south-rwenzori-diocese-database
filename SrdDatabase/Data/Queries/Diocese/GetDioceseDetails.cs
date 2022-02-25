using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Diocese;

namespace SrdDatabase.Data.Queries.Diocese
{
    public class GetDioceseDetails
    {
        public class Query : IRequest<DioceseDetails>
        {
        }

        public class Handler : IRequestHandler<Query, DioceseDetails>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_diocese_details";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<DioceseDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QuerySingleAsync<DioceseDetails>(
                    _storedProcedure,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
