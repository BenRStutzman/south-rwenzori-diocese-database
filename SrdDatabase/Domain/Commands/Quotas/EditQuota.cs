using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Quotas;
using System;
using SrdDatabase.Data.Commands.Quotas;

namespace SrdDatabase.Domain.Commands.Quotas
{
    public class EditQuota
    {
        public class Command : QuotaFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
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
                var dataCommand = new SaveQuota.Command(
                    request.Id,
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
