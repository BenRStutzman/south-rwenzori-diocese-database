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
        public class Command : IRequest<Response>
        {
            public int? Id { get; set; }

            [StringLength(50)]
            public string Name { get; }

            public Command(int? id, string name)
            {
                Id = id;
                Name = name;
            }
        }

        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_archdeaconry";

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

            public Response (int id)
            {
                Id = id;
            }
        }
    }
}
