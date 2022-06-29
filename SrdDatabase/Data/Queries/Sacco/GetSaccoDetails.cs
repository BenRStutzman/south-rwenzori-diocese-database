using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco;

namespace SrdDatabase.Data.Queries.Sacco
{
    public class GetSaccoDetails
    {
        public class Query : IRequest<SaccoDetails>
        {
        }

        public class Handler : IRequestHandler<Query, SaccoDetails>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_details";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<SaccoDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QuerySingleAsync<SaccoDetails>(
                    _storedProcedure,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
