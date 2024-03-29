﻿using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Data.Commands.Congregations;

namespace SrdDatabase.Domain.Commands.Congregations
{
    public class AddCongregation
    {
        public class Command : CongregationFields, IRequest<SaveResponse>
        {
            public Command(string name, int parishId)
                : base(name, parishId)
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
                var dataCommand = new SaveCongregation.Command(
                    null,
                    request.Name,
                    request.ParishId,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
