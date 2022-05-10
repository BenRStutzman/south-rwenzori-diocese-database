using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.LoanInstallments;
using System;

namespace SrdDatabase.Data.Queries.Sacco.LoanInstallments
{
    public class GetLoanInstallments
    {
        public class Query : LoanInstallmentParameters, IRequest<LoanInstallmentResults>
        {
            public Query(
                int? id = null,
                int? memberId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int? receiptNumber = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base (memberId,
                    startDate,
                    endDate,
                    receiptNumber,
                    pageNumber,
                    sortColumn,
                    sortDescending,
                    pageSize,
                    id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, LoanInstallmentResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_loan_installments";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<LoanInstallmentResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var loanInstallments = results.Read<LoanInstallment>();

                return new LoanInstallmentResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    loanInstallments);
            }
        }
    }
}
