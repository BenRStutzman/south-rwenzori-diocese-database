using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Transactions;
using SrdDatabase.Models.Shared;
using System;

namespace SrdDatabase.Data.Commands.Sacco.Transactions
{
    public class SaveTransaction
    {
        public class Command : TransactionFields, IRequest<SaveResponse>
        {
            public int? Id { get; set; }

            public Command(
                int? id,
                int amount,
                int memberId,
                DateTime date,
                bool isShares,
                bool isContribution,
                int? receiptNumber,
                string notes,
                int userId
                )
                : base(
                    amount,
                    memberId,
                    date,
                    isShares,
                    isContribution,
                    receiptNumber,
                    notes,
                    userId
                    )
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_sacco_transaction";

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
