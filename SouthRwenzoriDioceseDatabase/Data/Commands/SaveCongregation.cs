using MediatR;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;

namespace SouthRwenzoriDioceseDatabase.Data.Commands
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
            private readonly IDbConnection _connection;

            private readonly string _storedProcedure = "sto_save_congregation";

            public Handler(IDbConnection connection)
            {
                _connection = connection;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                return await _connection.QuerySingleAsync<int>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
