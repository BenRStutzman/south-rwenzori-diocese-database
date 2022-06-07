using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Transactions;
using SrdDatabase.Data.Commands.Sacco.Transactions;
using System;

namespace SrdDatabase.Domain.Commands.Sacco.Transactions
{
    public class AddTransaction
    {
        public class Command : TransactionFields, IRequest<SaveResponse>
        {
            public Command(
                int amount,
                int memberId,
                DateTime date,
                bool isShares,
                bool isContribution,
                int? receiptNumber,
                string notes
                )
                : base(
                    amount,
                    memberId,
                    date,
                    isShares,
                    isContribution,
                    receiptNumber,
                    notes
                    )
            {
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<SaveResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var dataCommand = new SaveTransaction.Command(
                    null,
                    request.Amount,
                    request.MemberId,
                    request.Date,
                    request.IsShares,
                    request.IsContribution,
                    request.ReceiptNumber,
                    request.Notes,
                    request.UserId.Value
                    );

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
