﻿using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.ChristianCounts;
using System;
using SrdDatabase.Data.Commands.ChristianCounts;

namespace SrdDatabase.Domain.Commands.ChristianCounts
{
    public class EditChristianCount
    {
        public class Command : ChristianCountFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
                int numberOfChristians,
                int congregationId,
                DateTime date)
                : base(
                    numberOfChristians,
                    congregationId,
                    date)
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
                var dataCommand = new SaveChristianCount.Command(
                    request.Id,
                    request.NumberOfChristians,
                    request.CongregationId,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
