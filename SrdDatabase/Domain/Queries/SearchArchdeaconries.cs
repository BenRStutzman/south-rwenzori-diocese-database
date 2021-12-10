using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Archdeaconries;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchArchdeaconries
    {
        public class Query : ArchdeaconryParameters, IRequest<ArchdeaconryResults>
        {
            public Query(
                string name = null,
                int pageNumber = 0) : base(name, pageNumber)
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
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
