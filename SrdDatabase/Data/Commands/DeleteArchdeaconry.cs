﻿using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;

namespace SrdDatabase.Data.Commands
{
    public class DeleteArchdeaconry
    {
        public class Command : IRequest
        {
            public int Id { get; }

            public Command(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IDbConnection _connection;

            private readonly string _storedProcedure = "sto_delete_archdeaconry";

            public Handler(IDbConnection connection)
            {
                _connection = connection;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                await _connection.ExecuteAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                return Unit.Value;
            }
        }
    }
}