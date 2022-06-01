using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Distributions;

namespace SrdDatabase.Data.Queries.Sacco.Distributions
{
    public class GetDistributionsApplied
    {
        public class Query : DistributionAppliedParameters, IRequest<DistributionAppliedResults>
        {
            public Query(
                int memberId,
                int pageNumber = 0,
                int? pageSize = null) :
                base (memberId,
                    pageNumber,
                    pageSize)
            {
            }
        }

        public class Handler : IRequestHandler<Query, DistributionAppliedResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_distributions_applied";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<DistributionAppliedResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var distributionsApplied = results.Read<DistributionApplied>();

                return new DistributionAppliedResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    distributionsApplied);
            }
        }
    }
}
