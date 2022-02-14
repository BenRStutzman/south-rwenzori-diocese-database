using MediatR;
using SrdDatabase.Data.Queries.Archdeaconries;
using SrdDatabase.Models.Archdeaconries;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Archdeaconries
{
    public class SearchArchdeaconries
    {
        public class Query : ArchdeaconryParameters, IRequest<ArchdeaconryResults>
        {
            public Query(
                string name = null,
                string sortColumn = null,
                bool sortDescending = false,
                int pageNumber = 0) : base(
                    name,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, ArchdeaconryResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ArchdeaconryResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetArchdeaconries.Query(
                        null,
                        request.Name,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
