using MediatR;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Models.Parishes;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Parishes
{
    public class GetParishDetails
    {
        public class Query : IRequest<ParishDetails>
        {
            [Range(1, int.MaxValue)]
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
                    parishId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var congregationsTask = _mediator.Send(congregationsQuery, cancellationToken);

                var eventsQuery = new GetEvents.Query(
                    parishId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var eventsTask = _mediator.Send(eventsQuery, cancellationToken);

                var parish = await parishTask;
                var congregationResults = await congregationsTask;
                var eventsResults = await eventsTask;

                return new ParishDetails(
                    parish,
                    congregationResults,
                    eventsResults);
            }
        }
    }
}
