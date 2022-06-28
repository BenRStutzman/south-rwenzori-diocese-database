using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Payments;
using System;

namespace SrdDatabase.Data.Queries.Sacco.Payments
{
    public class GetPayments
    {
        public class Query : PaymentParameters, IRequest<PaymentResults>
        {
            public Query(
                int? id = null,
                int? loanId = null,
                int? memberId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int? receiptNumber = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base(
                    loanId,
                    memberId,
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

        public class Handler : IRequestHandler<Query, PaymentResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_payments";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<PaymentResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var payments = results.Read<Payment>();

                return new PaymentResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    payments);
            }
        }
    }
}
