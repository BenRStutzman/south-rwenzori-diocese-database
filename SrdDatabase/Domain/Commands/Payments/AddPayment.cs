using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Payments;
using System;
using SrdDatabase.Data.Commands.Payments;

namespace SrdDatabase.Domain.Commands.Payments
{
    public class AddPayment
    {
        public class Command : PaymentFields, IRequest<SaveResponse>
        {
            public Command(
                int amount,
                int congregationId,
                DateTime date)
                : base(
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
                var dataCommand = new SavePayment.Command(
                    null,
                    request.Amount,
                    request.CongregationId,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
