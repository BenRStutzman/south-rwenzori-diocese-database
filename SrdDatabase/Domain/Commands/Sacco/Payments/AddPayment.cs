using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Payments;
using SrdDatabase.Data.Commands.Sacco.Payments;
using System;

namespace SrdDatabase.Domain.Commands.Sacco.Payments
{
    public class AddPayment
    {
        public class Command : PaymentFields, IRequest<SaveResponse>
        {
            public Command(
                int amount,
                int loanId,
                DateTime date,
                int? receiptNumber
                )
                : base(
                    amount,
                    loanId,
                    date,
                    receiptNumber
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
                var dataCommand = new SavePayment.Command(
                    null,
                    request.Amount,
                    request.LoanId,
                    request.Date,
                    request.ReceiptNumber,
                    request.UserId.Value
                    );

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
