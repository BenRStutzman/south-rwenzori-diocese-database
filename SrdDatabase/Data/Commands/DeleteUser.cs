using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Data.Commands
{
    public class DeleteUser
    {
        public class Command : IRequest
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_delete_user";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                await connection.ExecuteAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                return Unit.Value;
            }
        }
    }
}
