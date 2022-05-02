using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Members;

namespace SrdDatabase.Data.Queries.Sacco.Members
{
    public class GetMembers
    {
        public class Query : MemberParameters, IRequest<MemberResults>
        {
            public Query(
                int? id = null,
                string name = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base (name,
                      pageNumber,
                      sortColumn,
                      sortDescending,
                      pageSize,
                      id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, MemberResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_members";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<MemberResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var members = results.Read<Member>();

                return new MemberResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    members);
            }
        }
    }
}
