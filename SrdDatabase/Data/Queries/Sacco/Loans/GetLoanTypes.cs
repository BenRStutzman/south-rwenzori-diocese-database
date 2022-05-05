using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Loans;

namespace SrdDatabase.Data.Queries.Sacco.Loans
{
    public class GetLoanTypes
    {
        public class Query : IRequest<IEnumerable<LoanType>>
        {
            public Query()
            {
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<LoanType>>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_loan_types";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<IEnumerable<LoanType>> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QueryAsync<LoanType>(
                    _storedProcedure,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
