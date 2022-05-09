using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Shared;

namespace SrdDatabase.Data.Commands.Congregations
{
    public class SaveCongregation
    {
        public class Command : CongregationFields, IRequest<SaveResponse>
        {
            public int? Id { get; set; }

            public Command(int? id, string name, int parishId, int userId)
                : base (name, parishId, userId)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_congregation";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<SaveResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                var id = await connection.QuerySingleAsync<int>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                return SaveResponse.ForSuccess(id);
            }
        }
    }
}
