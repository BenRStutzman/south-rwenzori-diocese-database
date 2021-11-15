using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;

namespace SrdDatabase.Data.Commands
{
    public class SaveUser
    {
        public class Command : IRequest<int>
        {
            public int? Id { get; }

            public string Name { get; }

            public string Username { get; }

            public string Password { get; }

            public byte UserTypeId { get; }

            public bool SetPassword { get; }

            public Command(
                int? id,
                string name,
                string username,
                string password,
                byte userTypeId,
                bool setPassword)
            {
                Id = id;
                Name = name;
                Username = username;
                Password = password;
                UserTypeId = userTypeId;
                SetPassword = setPassword;
            }
        }

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_user";

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
