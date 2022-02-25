using MediatR;
using SrdDatabase.Data.Queries.Censuses;
using SrdDatabase.Models.Censuses;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Censuses
{
    public class SearchCensuses
    {
        public class Query : CensusParameters, IRequest<CensusResults>
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

        public class Handler : IRequestHandler<Query, CensusResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<CensusResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetCensuses.Query(
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
