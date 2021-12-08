using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Archdeaconries;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetArchdeaconryById
    {
        public class Query : IRequest<Archdeaconry>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Archdeaconry>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Archdeaconry> Handle(Query request, CancellationToken cancellationToken)
            {
                var archdeaconriesResponse = await _mediator.Send(new GetArchdeaconries.Query(id: request.Id), cancellationToken);
                return archdeaconriesResponse.Archdeaconries.Single();
            }
        }
    }
}
