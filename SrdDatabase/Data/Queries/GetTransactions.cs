using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System;
using SrdDatabase.Services;
using SrdDatabase.Models.Transactions;

namespace SrdDatabase.Data.Queries
{
    public class GetTransactions
    {
        public class Query : TransactionParameters, IRequest<ChargeResults>
        {
            public Query(
                int? id = null,
                byte? transactionTypeId = null,
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                int? pageSize = null)
                : base(
                      transactionTypeId,
                      archdeaconryId,
                      parishId,
                      congregationId,
                      startDate,
                      endDate,
                      pageNumber,
                      pageSize,
                      id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, ChargeResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_transactions";

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
                var transactions = results.Read<Charge>();

                return new TransactionResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    transactions);
            }
        }
    }
}
