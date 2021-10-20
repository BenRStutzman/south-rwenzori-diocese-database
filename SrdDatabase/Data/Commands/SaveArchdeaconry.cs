using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Data.Commands
{
    public class SaveArchdeaconry
    {
        public class Command : IRequest<int>
        {
            public int? Id { get; }

            [StringLength(50)]
            public string Name { get; }

            public Command(int? id, string name)
            {
                Id = id;
                Name = name;
            }
        }

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_archdeaconry";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QuerySingleAsync<int>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
