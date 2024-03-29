﻿using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Parishes;
using SrdDatabase.Data.Commands.Parishes;

namespace SrdDatabase.Domain.Commands.Parishes
{
    public class EditParish
    {
        public class Command : ParishFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(int id, string name, int archdeaconryId)
                : base(name, archdeaconryId)
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
                var dataCommand = new SaveParish.Command(
                    request.Id,
                    request.Name,
                    request.ArchdeaconryId,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
