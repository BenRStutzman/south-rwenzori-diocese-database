using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.ChristianCounts;
using System;
using SrdDatabase.Data.Commands.ChristianCounts;

namespace SrdDatabase.Domain.Commands.ChristianCounts
{
    public class AddChristianCount
    {
        public class Command : ChristianCountFields, IRequest<SaveResponse>
        {
            public Command(
                int numberOfChristians,
                int congregationId,
                DateTime date)
                : base(
                    numberOfChristians,
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
                var dataCommand = new SaveChristianCount.Command(
                    null,
                    request.NumberOfChristians,
                    request.CongregationId,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
