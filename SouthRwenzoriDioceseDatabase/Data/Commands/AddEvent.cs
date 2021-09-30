using MediatR;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;

namespace SouthRwenzoriDioceseDatabase.Data.Commands
{
    public class AddEvent
    {
        public class Command : IRequest<int>
        {
            public byte EventTypeId { get; }

            public int CongregationId { get; }

            public string PersonName { get; }

            public DateTime Date { get; }

            public Command(
                byte eventTypeId,
                int congregationId,
                string personName,
                DateTime date)
            {
                EventTypeId = eventTypeId;
                CongregationId = congregationId;
                PersonName = personName;
                Date = date;
            }
        }

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly IDbConnection _connection;

            private readonly string _storedProcedure = "sto_add_event";

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
