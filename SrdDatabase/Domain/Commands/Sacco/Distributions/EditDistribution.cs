using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Distributions;
using System;
using SrdDatabase.Data.Commands.Sacco.Distributions;
using SrdDatabase.Data.Queries.Sacco.Distributions;
using System.Linq;

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
                decimal dividendPercentage,
                decimal interestPercentage,
                DateTime date)
                : base(dividendPercentage, interestPercentage, date)
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
                var dateQuery = new GetDistributions.Query(startDate: request.Date, endDate: request.Date);
                var dateResults = await _mediator.Send(dateQuery, cancellationToken);

                if (dateResults.Distributions.Any(distribution => distribution.Id != request.Id))
                {
                    return SaveResponse.ForError(
                        $"A distribution on the date {request.Date} already exists. " +
                        "Please choose a different date or edit the existing distribution.",
                        nameof(request.Date)
                    );
                }

                var dataCommand = new SaveDistribution.Command(
                    request.Id,
                    request.DividendPercentage,
                    request.InterestPercentage,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
