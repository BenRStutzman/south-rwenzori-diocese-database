using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Quotas;

namespace SrdDatabase.Data.Queries.Quotas
{
    public class GetQuotas
    {
        public class Query : QuotaParameters, IRequest<QuotaResults>
        {
            public Query(
                int? id = null,
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                int? startYear = null,
                int? endYear = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null)
                : base(
                      archdeaconryId,
                      parishId,
                      congregationId,
                      startYear,
                      endYear,
                      pageNumber,
                      sortColumn,
                      sortDescending,
                      pageSize,
                      id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, QuotaResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_quotas";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<QuotaResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var quotas = results.Read<Quota>();

                return new QuotaResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    quotas);
            }
        }
    }
}
