using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Loans;
using SrdDatabase.Models.Shared;
using System;

namespace SrdDatabase.Data.Commands.Sacco.Loans
{
    public class SaveLoan
    {
        public class Command : LoanFields, IRequest<SaveResponse>
        {
            public int? Id { get; set; }

            public Command(
                int? id,
                int principal,
                int memberId,
                DateTime date,
                sbyte loanTypeId,
                sbyte termMonths,
                int userId)
                : base (principal, memberId, loanTypeId, date, termMonths, userId)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_sacco_loan";

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
