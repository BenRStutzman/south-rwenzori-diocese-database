using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Payments;
using System;
using SrdDatabase.Data.Commands.Sacco.Payments;

namespace SrdDatabase.Domain.Commands.Sacco.Payments
{
    public class EditPayment
    {
        public class Command : PaymentFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
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
                Id = id;
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
                    request.Id,
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
