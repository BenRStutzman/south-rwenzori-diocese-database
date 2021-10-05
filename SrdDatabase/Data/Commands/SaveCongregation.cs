using MediatR;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;

namespace SrdDatabase.Data.Commands
{
    public class SaveCongregation
    {
        public class Command : IRequest<int>
        {
            public int? Id { get; }

            public string Name { get; }

            public int ParishId { get; }

            public Command(int? id, string name, int parishId)
            {
                Id = id;
                Name = name;
                ParishId = parishId;
            }
        }

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_congregation";

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
