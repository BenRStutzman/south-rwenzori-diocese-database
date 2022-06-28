using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Installments;

namespace SrdDatabase.Data.Queries.Sacco.Installments
{
    public class GetInstallments
    {
        public class Query : InstallmentParameters, IRequest<InstallmentResults>
        {
            public Query(
                int? id = null,
                int? loanId = null,
                int? memberId = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base (loanId,
                    memberId,
                    pageNumber,
                    sortColumn,
                    sortDescending,
                    pageSize,
                    id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, InstallmentResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_installments";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<InstallmentResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var installments = results.Read<Installment>();

                return new InstallmentResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    installments);
            }
        }
    }
}
