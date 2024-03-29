﻿using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Events;
using System;
using SrdDatabase.Data.Commands.Events;

namespace SrdDatabase.Domain.Commands.Events
{
    public class AddEvent
    {
        public class Command : EventFields, IRequest<SaveResponse>
        {
            public Command(
                sbyte eventTypeId,
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
