using MediatR;
using SrdDatabase.Data.Queries.Archdeaconries;
using SrdDatabase.Models.Archdeaconries;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Archdeaconries
{
    public class GetArchdeaconryById
    {
        public class Query : IRequest<Archdeaconry>
        {
            [Range(1, int.MaxValue)]
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
                var results = await _mediator.Send(new GetArchdeaconries.Query(request.Id), cancellationToken);
                return results.Archdeaconries.Single();
            }
        }
    }
}
