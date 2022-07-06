using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Distributions;
using SrdDatabase.Data.Commands.Sacco.Distributions;
using System;
using SrdDatabase.Data.Queries.Sacco.Distributions;
using SrdDatabase.Helpers;

namespace SrdDatabase.Domain.Commands.Sacco.Distributions
{
    public class AddDistribution
    {
        public class Command : DistributionFields, IRequest<SaveResponse>
        {
            public Command(
                decimal dividendPercentage,
                decimal interestPercentage,
                DateTime date)
                : base(dividendPercentage, interestPercentage, date)
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
                var dateQuery = new GetDistributions.Query(startDate: request.Date, endDate: request.Date);
                var dateResults = await _mediator.Send(dateQuery, cancellationToken);

                if (dateResults.TotalResults > 0)
                {
                    return SaveResponse.ForError(
                        $"A distribution on the date {GeneralHelper.FormattedDate(request.Date)} already exists. " +
                        "Please choose a different date or edit the existing distribution.",
                        nameof(request.Date)
                    );
                }

                var dataCommand = new SaveDistribution.Command(
                    null,
                    request.DividendPercentage,
                    request.InterestPercentage,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
