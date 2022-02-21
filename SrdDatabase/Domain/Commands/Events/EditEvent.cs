using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Events;
using System;
using SrdDatabase.Data.Commands.Events;

namespace SrdDatabase.Domain.Commands.Events
{
    public class EditEvent
    {
        public class Command : EventFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
                byte eventTypeId,
                DateTime date,
                int? congregationId,
                int? parishId,
                string description,
                string firstPersonName,
                string secondPersonName)
                : base(
                    eventTypeId,
                    date,
                    congregationId,
                    parishId,
                    description,
                    firstPersonName,
                    secondPersonName)
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
                var dataCommand = new SaveEvent.Command(
                    request.Id,
                    request.EventTypeId,
                    request.Date,
                    request.CongregationId,
                    request.ParishId,
                    request.Description,
                    request.FirstPersonName,
                    request.SecondPersonName,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
