using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System;
using SrdDatabase.Data.Queries;
using System.Linq;

namespace SrdDatabase.Domain.Commands
{
    public class SaveEvent
    {
        public class Command : IRequest<int>
        {
            public int? Id { get; }

            public byte EventTypeId { get; }

            public int CongregationId { get; }

            public string FirstPersonName { get; }

            public string SecondPersonName { get; }

            public DateTime Date { get; }

            public Command(
                int? id,
                byte eventTypeId,
                int congregationId,
                string firstPersonName,
                string secondPersonName,
                DateTime date)
            {
                Id = id;
                EventTypeId = eventTypeId;
                CongregationId = congregationId;
                FirstPersonName = firstPersonName;
                SecondPersonName = secondPersonName;
                Date = date;
            }
        }

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var eventTypes = await _mediator.Send(new GetEventTypes.Query(), cancellationToken);

                var eventType = eventTypes.Single(eventType => eventType.Id == request.EventTypeId);

                var domainCommand = new Data.Commands.SaveEvent.Command(
                    request.Id,
                    request.EventTypeId,
                    request.CongregationId,
                    request.FirstPersonName,
                    eventType.InvolvesTwoPeople ? request.SecondPersonName : null,
                    request.Date);

                return await _mediator.Send(domainCommand);
            }
        }
    }
}
