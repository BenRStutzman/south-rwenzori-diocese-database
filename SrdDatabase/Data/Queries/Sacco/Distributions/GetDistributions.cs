using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Distributions;
using System;

namespace SrdDatabase.Data.Queries.Sacco.Distributions
{
    public class GetDistributions
    {
        public class Query : DistributionParameters, IRequest<DistributionResults>
        {
            public Query(
                int? id = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base (startDate,
                    endDate,
                    pageNumber,
                    sortColumn,
                    sortDescending,
                    pageSize,
                    id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, DistributionResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_distributions";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<DistributionResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var distributions = results.Read<Distribution>();

                return new DistributionResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    distributions);
            }
        }
    }
}
