using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System;
using SrdDatabase.Services;
using SrdDatabase.Models.Payments;

namespace SrdDatabase.Data.Queries.Payments
{
    public class GetPayments
    {
        public class Query : PaymentParameters, IRequest<PaymentResults>
        {
            public Query(
                int? id = null,
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int? receiptNumber = null,
                int pageNumber = 0,
                int? pageSize = null)
                : base(
                      archdeaconryId,
                      parishId,
                      congregationId,
                      startDate,
                      endDate,
                      receiptNumber,
                      pageNumber,
                      pageSize,
                      id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, PaymentResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_payments";

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
