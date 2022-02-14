using MediatR;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Payments;

namespace SrdDatabase.Data.Commands.Payments
{
    public class SavePayment
    {
        public class Command : PaymentFields, IRequest<SaveResponse>
        {
            public int?  Id { get; set; }

            public Command(
                int? id,
                int amount,
                int congregationId,
                DateTime date,
                int? receiptNumber,
                int userId)
                : base(
                    amount,
                    congregationId,
                    date,
                    receiptNumber,
                    userId)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_payment";

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
