using MediatR;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Events;

namespace SrdDatabase.Data.Commands.Events
{
    public class SaveEvent
    {
        public class Command : EventFields, IRequest<SaveResponse>
        {
            public int?  Id { get; set; }

            public Command(
                int? id,
                byte eventTypeId,
                DateTime date,
                int? congregationId,
                int? parishId,
                string description,
                string firstPersonName,
                string secondPersonName,
                int userId)
                : base(
                    eventTypeId,
                    date,
                    congregationId,
                    parishId,
                    description,
                    firstPersonName,
                    secondPersonName,
                    userId)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_event";

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
