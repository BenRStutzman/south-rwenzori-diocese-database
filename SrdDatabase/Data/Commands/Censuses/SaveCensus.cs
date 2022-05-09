using MediatR;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Censuses;

namespace SrdDatabase.Data.Commands.Censuses
{
    public class SaveCensus
    {
        public class Command : CensusFields, IRequest<SaveResponse>
        {
            public int?  Id { get; set; }

            public Command(
                int? id,
                int males0To12,
                int females0To12,
                int males13To17,
                int females13To17,
                int males18To35,
                int females18To35,
                int males36AndAbove,
                int females36AndAbove,
                int congregationId,
                DateTime date,
                int userId)
                : base(
                    males0To12,
                    females0To12,
                    males13To17,
                    females13To17,
                    males18To35,
                    females18To35,
                    males36AndAbove,
                    females36AndAbove,
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

            private readonly string _storedProcedure = "sto_save_census";

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

                return SaveResponse.ForSuccess(id);
            }
        }
    }
}
