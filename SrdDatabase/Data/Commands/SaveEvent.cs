using MediatR;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;

namespace SrdDatabase.Data.Commands
{
    public class SaveEvent
    {
        public class Command : IRequest<int>
        {
            public int?  Id { get; }

            public byte EventTypeId { get; }

            public int CongregationId { get; }

            public string PersonName { get; }

            public DateTime Date { get; }

            public Command(
                int? id,
                byte eventTypeId,
                int congregationId,
                string personName,
                DateTime date)
            {
                Id = id;
                EventTypeId = eventTypeId;
                CongregationId = congregationId;
                PersonName = personName;
                Date = date;
            }
        }

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_event";

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
