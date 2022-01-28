using MediatR;
using SrdDatabase.Models.Events;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Events
{
    public class GetEventDetails
    {
        public class Query : IRequest<EventDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, EventDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<EventDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var baseEvent = await _mediator.Send(new GetEventById.Query(request.Id), cancellationToken);

                return new EventDetails(baseEvent);
            }
        }
    }
}
