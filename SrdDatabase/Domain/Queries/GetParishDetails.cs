using MediatR;
using SrdDatabase.Data.Queries;
using Congregations = SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Parishes;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetParishDetails
    {
        public class Query : IRequest<ParishDetails>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, ParishDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ParishDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var parishTask = _mediator.Send(new GetParishById.Query(request.Id), cancellationToken);
                
                var congregationsQuery = new GetCongregations.Query(
                    new Congregations.CongregationParameters(parishId: request.Id));
                var congregationsTask = _mediator.Send(congregationsQuery, cancellationToken);
                
                var eventsTask = _mediator.Send(new GetEvents.Query(parishId: request.Id), cancellationToken);

                var parish = (await parishTask);
                var congregationResults = await congregationsTask;
                var events = await eventsTask;

                return new Details(
                    parish,
                    congregationResults.Congregations,
                    events);
            }
        }
    }
}
