using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Transactions;
using System;

namespace SrdDatabase.Data.Queries.Sacco.Transactions
{
    public class GetTransactions
    {
        public class Query : TransactionParameters, IRequest<TransactionResults>
        {
            public Query(
                int? id = null,
                int? memberId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int? receiptNumber = null,
                bool? isShares = null,
                bool? isContribution = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base (memberId,
                    startDate,
                    endDate,
                    receiptNumber,
                    isShares,
                    isContribution,
                    pageNumber,
                    sortColumn,
                    sortDescending,
                    pageSize,
                    id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, TransactionResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_transactions";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<TransactionResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var transactions = results.Read<Transaction>();

                return new TransactionResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    transactions);
            }
        }
    }
}
