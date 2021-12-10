using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Transactions;

namespace SrdDatabase.Data.Queries
{
    public class GetTransactionTypes
    {
        public class Query : IRequest<IEnumerable<TransactionType>>
        {
            public Query()
            {
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<TransactionType>>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_transaction_types";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<IEnumerable<TransactionType>> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QueryAsync<TransactionType>(
                    _storedProcedure,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
