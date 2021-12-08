using MediatR;
using SrdDatabase.Data.Queries;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Archdeaconries;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Parishes;

namespace SrdDatabase.Domain.Queries
{
    public class GetArchdeaconryDetails
    {
        public class Query : IRequest<ArchdeaconryDetails>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, ArchdeaconryDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ArchdeaconryDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var archdeaconryTask = _mediator.Send(new GetArchdeaconryById.Query(request.Id), cancellationToken);

                var parishesQuery = new GetParishes.Query(
                    new ParishParameters(archdeaconryId: request.Id),
                    pageSize: Constants.DetailsPageSize);
                var parishesTask = _mediator.Send(parishesQuery, cancellationToken);

                var congregationsQuery = new GetCongregations.Query(
                    new CongregationParameters(archdeaconryId: request.Id),
                    pageSize: Constants.DetailsPageSize);
                var congregationsTask = _mediator.Send(congregationsQuery, cancellationToken);

                var eventsQuery = new GetEvents.Query(
                    new EventParameters(archdeaconryId: request.Id),
                    pageSize: Constants.DetailsPageSize);
                var eventsTask = _mediator.Send(eventsQuery, cancellationToken);

                var archdeaconry = await archdeaconryTask;
                var parishResults = await parishesTask;
                var congregationResults = await congregationsTask;
                var eventResults = await eventsTask;

                return new ArchdeaconryDetails(
                    archdeaconry,
                    parishResults,
                    congregationResults,
                    eventResults);
            }
        }
    }
}
