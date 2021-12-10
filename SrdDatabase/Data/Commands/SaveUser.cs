using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Data.Commands
{
    public class SaveUser
    {
        public class Command : UserFields, IRequest<SaveResponse>
        {
            public int? Id { get; set; }

            [StringLength(60)]
            public string Password { get; }

            public Command(
                int? id,
                string name,
                string username,
                string password,
                byte userTypeId,
                int userId)
                : base (userTypeId, name, username, userId)
            {
                Id = id;
                Password = string.IsNullOrEmpty(password) ? null
                    : BCrypt.Net.BCrypt.HashPassword(password);
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_user";

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

                return new SaveResponse(id);
            }
        }
    }
}
