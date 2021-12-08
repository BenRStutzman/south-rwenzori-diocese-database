using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;

namespace SrdDatabase.Data.Commands
{
    public class SaveCongregation
    {
        public class Command : IRequest<Response>
        {
            public int? Id { get; set; }

            public string Name { get; }

            public int ParishId { get; }

            public Command(int? id, string name, int parishId)
            {
                Id = id;
                Name = name;
                ParishId = parishId;
            }
        }

        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_congregation";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                var id = await connection.QuerySingleAsync<int>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                return new Response(id);
            }
        }

        public class Response
        {
            public int Id { get; }

            public Response(int id)
            {
                Id = id;
            }
        }
    }
}
