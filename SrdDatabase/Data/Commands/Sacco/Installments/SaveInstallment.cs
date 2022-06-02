using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Installments;
using SrdDatabase.Models.Shared;
using System;

namespace SrdDatabase.Data.Commands.Sacco.Installments
{
    public class SaveInstallment
    {
        public class Command : InstallmentFields, IRequest<SaveResponse>
        {
            public int? Id { get; set; }

            public Command(
                int? id,
                DateTime datePaid,
                int? receiptNumber,
                int userId)
                : base(datePaid, receiptNumber, userId)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_sacco_installment";

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
