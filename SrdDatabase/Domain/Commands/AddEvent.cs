using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Events;
using System;

namespace SrdDatabase.Domain.Commands
{
    public class AddEvent
    {
        public class Command : EventFields, IRequest<SaveResponse>
        {
            public Command(
                byte eventTypeId,
                int congregationId,
                string firstPersonName,
                string secondPersonName,
                DateTime date)
                : base(
                    eventTypeId,
                    congregationId,
                    firstPersonName,
                    secondPersonName,
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
                var dataCommand = new SaveEvent.Command(
                    null,
                    request.EventTypeId,
                    request.CongregationId,
                    request.FirstPersonName,
                    request.SecondPersonName,
                    request.Date);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
