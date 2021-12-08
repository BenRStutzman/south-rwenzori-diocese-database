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
        public class Command : IRequest<Response>
        {
            public int?  Id { get; set; }

            public byte EventTypeId { get; }

            public int CongregationId { get; }

            public string FirstPersonName { get; }

            public string SecondPersonName { get; }

            public DateTime Date { get; }

            public Command(
                int? id,
                byte eventTypeId,
                int congregationId,
                string firstPersonName,
                string secondPersonName,
                DateTime date)
            {
                Id = id;
                EventTypeId = eventTypeId;
                CongregationId = congregationId;
                FirstPersonName = firstPersonName;
                SecondPersonName = secondPersonName;
                Date = date;
            }
        }

        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_event";

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

            public Response(int id)
            {
                Id = id;
            }
        }
    }
}
