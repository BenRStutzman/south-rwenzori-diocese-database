﻿using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Commands
{
    public class EditEvent
    {
        public class Command : IRequest<int>
        {
            public int  Id { get; }

            public byte EventTypeId { get; }

            public int CongregationId { get; }

            public string FirstPersonName { get; }

            public string SecondPersonName { get; }

            public DateTime Date { get; }

            public Command(
                int id,
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
                var dataCommand = new Data.Commands.SaveEvent.Command(
                    id: request.Id,
                    eventTypeId: request.EventTypeId,
                    congregationId: request.CongregationId,
                    firstPersonName: request.FirstPersonName,
                    secondPersonName: request.SecondPersonName,
                    date: request.Date);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}