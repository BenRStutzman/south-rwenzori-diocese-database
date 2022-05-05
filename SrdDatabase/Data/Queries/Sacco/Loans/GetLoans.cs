using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Loans;
using System;

namespace SrdDatabase.Data.Queries.Sacco.Loans
{
    public class GetLoans
    {
        public class Query : LoanParameters, IRequest<LoanResults>
        {
            public Query(
                int? id = null,
                int? memberId = null,
                sbyte? loanTypeId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base (memberId,
                    loanTypeId,
                    startDate,
                    endDate,
                    pageNumber,
                    sortColumn,
                    sortDescending,
                    pageSize,
                    id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, LoanResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_loans";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<LoanResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var loans = results.Read<Loan>();

                return new LoanResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    loans);
            }
        }
    }
}
