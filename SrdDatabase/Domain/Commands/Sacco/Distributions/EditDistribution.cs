using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Distributions;
using System;
using SrdDatabase.Data.Commands.Sacco.Distributions;

namespace SrdDatabase.Domain.Commands.Sacco.Distributions
{
    public class EditDistribution
    {
        public class Command : DistributionFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
                decimal percentage,
                DateTime date)
                : base(percentage, date)
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
                var dataCommand = new SaveDistribution.Command(
                    request.Id,
                    request.Percentage,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
