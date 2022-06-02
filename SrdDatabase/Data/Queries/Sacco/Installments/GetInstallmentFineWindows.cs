using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Installments;
using System;
using System.Collections.Generic;

namespace SrdDatabase.Data.Queries.Sacco.Installments
{
    public class GetInstallmentFineWindows
    {
        public class Query : IRequest<IEnumerable<FineWindow>>
        {
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<FineWindow>>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_installment_fine_windows";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<IEnumerable<FineWindow>> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var fineWindows = new List<FineWindow>();

                while (!results.IsConsumed)
                {
                    fineWindows.Add(results.ReadSingle<FineWindow>());
                }

                return fineWindows;
            }
        }
    }
}
