using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Charges;

namespace SrdDatabase.Data.Queries.Charges
{
    public class GetCharges
    {
        public class Query : ChargeParameters, IRequest<ChargeResults>
        {
            public Query(
                int? id = null,
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                int? startYear = null,
                int? endYear = null,
                int pageNumber = 0,
                int? pageSize = null)
                : base(
                      archdeaconryId,
                      parishId,
                      congregationId,
                      startYear,
                      endYear,
                      pageNumber,
                      pageSize,
                      id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, ChargeResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_charges";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<ChargeResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var charges = results.Read<Charge>();

                return new ChargeResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    charges);
            }
        }
    }
}
