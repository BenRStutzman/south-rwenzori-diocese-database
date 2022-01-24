using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Charges;
using System;

namespace SrdDatabase.Domain.Commands
{
    public class EditCharge
    {
        public class Command : ChargeFields, IRequest<SaveResponse>
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
                var dataCommand = new SaveCharge.Command(
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
