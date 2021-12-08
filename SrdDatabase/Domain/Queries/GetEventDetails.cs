using MediatR;
using SrdDatabase.Models.Events;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetEventDetails
    {
        public class Query : IRequest<Details>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Details>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Details> Handle(Query request, CancellationToken cancellationToken)
            {
                var baseEvent = await _mediator.Send(new GetEventById.Query(request.Id), cancellationToken);

                return new Details(baseEvent);
            }
        }
    }
}
