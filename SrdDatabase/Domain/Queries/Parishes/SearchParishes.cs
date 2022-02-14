using MediatR;
using SrdDatabase.Data.Queries.Parishes;
using SrdDatabase.Models.Parishes;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Parishes
{
    public class SearchParishes
    {
        public class Query : ParishParameters, IRequest<ParishResults>
        {
            public Query(
                string name = null,
                int? archdeaconryId = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base(
                    name,
                    archdeaconryId,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, ParishResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ParishResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetParishes.Query(
                        null,
                        request.Name,
                        request.ArchdeaconryId,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
