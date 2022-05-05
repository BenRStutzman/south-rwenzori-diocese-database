using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Events;
using System;
using SrdDatabase.Data.Commands.Events;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Domain.Commands.Events
{
    public class AddEvents
    {
        public class Command : EventFields, IRequest<MultiSaveResponse>
        {
            [Required]
            [MinLength(1)]
            public IEnumerable<string> PersonNames { get; }

            public Command(
                sbyte eventTypeId,
                DateTime date,
                int? congregationId,
                int? parishId,
                string description,
                IEnumerable<string> personNames)
                : base(
                    eventTypeId,
                    date,
                    congregationId,
                    parishId,
                    description,
                    null,
                    null)
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
                        request.Date,
                        request.CongregationId,
                        request.ParishId,
                        request.Description,
                        personName,
                        null,
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
