using MediatR;
using SrdDatabase.Data.Queries.ChristianCounts;
using SrdDatabase.Models.ChristianCounts;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.ChristianCounts
{
    public class SearchChristianCounts
    {
        public class Query : ChristianCountParameters, IRequest<ChristianCountResults>
        {
            public Query(
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false
                ) : base(
                    archdeaconryId,
                    parishId,
                    congregationId,
                    startDate,
                    endDate,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, ChristianCountResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ChristianCountResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetChristianCounts.Query(
                        null,
                        request.ArchdeaconryId,
                        request.ParishId,
                        request.CongregationId,
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
