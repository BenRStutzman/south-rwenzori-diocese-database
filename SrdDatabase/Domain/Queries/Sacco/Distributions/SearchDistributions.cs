using MediatR;
using SrdDatabase.Data.Queries.Sacco.Distributions;
using SrdDatabase.Models.Sacco.Distributions;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Distributions
{
    public class SearchDistributions
    {
        public class Query : DistributionParameters, IRequest<DistributionResults>
        {
            public Query(
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base
                    (startDate,
                    endDate,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, DistributionResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<DistributionResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetDistributions.Query(
                        null,
                        request.StartDate,
                        request.EndDate,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
