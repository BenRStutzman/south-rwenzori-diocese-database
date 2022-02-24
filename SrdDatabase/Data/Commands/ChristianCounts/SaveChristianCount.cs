using MediatR;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.ChristianCounts;

namespace SrdDatabase.Data.Commands.ChristianCounts
{
    public class SaveChristianCount
    {
        public class Command : ChristianCountFields, IRequest<SaveResponse>
        {
            public int?  Id { get; set; }

            public Command(
                int? id,
                int numberOfChristians,
                int congregationId,
                DateTime date,
                int userId)
                : base(
                    numberOfChristians,
                    congregationId,
                    date,
                    userId)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_christian_count";

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
