using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Charges;

namespace SrdDatabase.Data.Commands.Charges
{
    public class SaveCharge
    {
        public class Command : ChargeFields, IRequest<SaveResponse>
        {
            public int?  Id { get; set; }

            public Command(
                int? id,
                int amountPerYear,
                int startYear,
                int? endYear,
                int congregationId,
                int userId)
                : base(
                    amountPerYear,
                    congregationId,
                    startYear,
                    endYear,
                    userId)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_charge";

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
