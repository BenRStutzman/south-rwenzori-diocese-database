using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using System.ComponentModel.DataAnnotations;
using BCrypt.Net;

namespace SrdDatabase.Data.Commands
{
    public class SaveUser
    {
        public class Command : IRequest<int>
        {
            public int? Id { get; }

            [Required]
            [StringLength(50)]
            public string Name { get; }

            [Required]
            [StringLength(50)]

            public string Username { get; }

            [Required]
            [StringLength(60)]
            public string PasswordHash { get; }

            [Required]
            public byte UserTypeId { get; }

            public Command(
                int? id,
                string name,
                string username,
                string password,
                byte userTypeId)
            {
                Id = id;
                Name = name;
                Username = username;
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
                UserTypeId = userTypeId;
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
