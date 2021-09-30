using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using SouthRwenzoriDioceseDatabase.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Domain.Queries
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
                var archdeaconries = await _mediator.Send(new GetArchdeaconries.Query(request.Id), cancellationToken);
                return archdeaconries.Single();
            }
        }
    }
}
