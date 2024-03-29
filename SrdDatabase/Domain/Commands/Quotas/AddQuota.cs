﻿using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Quotas;
using SrdDatabase.Data.Commands.Quotas;

namespace SrdDatabase.Domain.Commands.Quotas
{
    public class AddQuota
    {
        public class Command : QuotaFields, IRequest<SaveResponse>
        {
            public Command(
                int amountPerYear,
                int congregationId,
                int startYear,
                int? endYear)
                : base(
                    amountPerYear,
                    congregationId,
                    startYear,
                    endYear)
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
                var dataCommand = new SaveQuota.Command(
                    null,
                    request.AmountPerYear,
                    request.StartYear,
                    request.EndYear,
                    request.CongregationId,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
