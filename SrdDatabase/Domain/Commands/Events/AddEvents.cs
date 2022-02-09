using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Events;
using System;
using SrdDatabase.Data.Commands.Events;
using System.Collections.Generic;
using System.Linq;

namespace SrdDatabase.Domain.Commands.Events
{
    public class AddEvents
    {
        public class Command : EventFields, IRequest<MultiSaveResponse>
        {
            public IEnumerable<string> PersonNames { get; }

            public Command(
                byte eventTypeId,
                int congregationId,
                IEnumerable<string> personNames,
                DateTime date)
                : base(
                    eventTypeId,
                    congregationId,
                    personNames.First(),
                    null,
                    date)
            {
                PersonNames = personNames;
            }
        }

        public class Handler : IRequestHandler<Command, MultiSaveResponse>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<MultiSaveResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var saveTasks = request.PersonNames.Select(personName =>
                {
                    var dataCommand = new SaveEvent.Command(
                        null,
                        request.EventTypeId,
                        request.CongregationId,
                        personName,
                        null,
                        request.Date,
                        request.UserId.Value);

                    return _mediator.Send(dataCommand, cancellationToken);
                });

                var saveResponses = await Task.WhenAll(saveTasks);
                var ids = saveResponses.Select(response => response.Id);

                return new MultiSaveResponse(ids);
            }
        }
    }
}
