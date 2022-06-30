using Dapper;
using MediatR;
using SrdDatabase.Models.Sacco.Reports;
using SrdDatabase.Services;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Data.Queries.Sacco.Reports
{
    public class GetMemberBalances
    {
        public class Query : IRequest<MemberBalances>
        {
            public int Id { get; }

            public DateTime Date { get; }

            public bool IncludeTransactionsOnDate { get; }

            public Query(
                int id,
                DateTime date,
                bool includeTransactionsOnDate = true
                )
            {
                Id = id;
                Date = date;
                IncludeTransactionsOnDate = includeTransactionsOnDate;
            }
        }

        public class Handler : IRequestHandler<Query, MemberBalances>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_member_balances";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<MemberBalances> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QuerySingleAsync<MemberBalances>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
