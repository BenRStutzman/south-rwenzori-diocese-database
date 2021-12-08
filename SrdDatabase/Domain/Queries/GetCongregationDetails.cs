using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Congregations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetCongregationDetails
    {
        public class Query : IRequest<CongregationDetails>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, CongregationDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<CongregationDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var congregationTask = _mediator.Send(new GetCongregationById.Query(request.Id), cancellationToken);
                var eventsTask = _mediator.Send(new GetEvents.Query(congregationId: request.Id), cancellationToken);

                var congregation = await congregationTask;
                var events = await eventsTask;

                return new Details(
                    congregation,
                    events);
            }
        }
    }
}
