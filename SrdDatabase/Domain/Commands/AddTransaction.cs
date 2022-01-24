using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Transactions;
using System;

namespace SrdDatabase.Domain.Commands
{
    public class AddTransaction
    {
        public class Command : ChargeFields, IRequest<SaveResponse>
        {
            public Command(
                byte transactionTypeId,
                int amount,
                int congregationId,
                DateTime date)
                : base(
                    transactionTypeId,
                    amount,
                    congregationId,
                    date)
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
                    request.TransactionTypeId,
                    request.Amount,
                    request.CongregationId,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
