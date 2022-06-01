using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Distributions;
using SrdDatabase.Data.Commands.Sacco.Distributions;
using System;

namespace SrdDatabase.Domain.Commands.Sacco.Distributions
{
    public class AddDistribution
    {
        public class Command : DistributionFields, IRequest<SaveResponse>
        {
            public Command(
                decimal percentage,
                DateTime date)
                : base(percentage, date)
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
                var dataCommand = new SaveDistribution.Command(
                    null,
                    request.DividendPercentage,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
