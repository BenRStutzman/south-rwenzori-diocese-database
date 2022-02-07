using MediatR;
using SrdDatabase.Data.Queries.Archdeaconries;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Data.Queries.Diocese;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Data.Queries.Parishes;
using SrdDatabase.Models.Diocese;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Diocese
{
    public class GetDioceseDetails
    {
        public class Query : IRequest<DioceseDetails>
        {
        }

        public class Handler : IRequestHandler<Query, DioceseDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<DioceseDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var archdeaconriesQuery = new GetArchdeaconries.Query(pageSize: Constants.DetailsPageSize);
                var archdeaconriesTask = _mediator.Send(archdeaconriesQuery, cancellationToken);

                var parishesQuery = new GetParishes.Query(pageSize: Constants.DetailsPageSize);
                var parishesTask = _mediator.Send(parishesQuery, cancellationToken);
                
                var congregationsQuery = new GetCongregations.Query(pageSize: Constants.DetailsPageSize);
                var congregationsTask = _mediator.Send(congregationsQuery, cancellationToken);

                var eventsQuery = new GetEvents.Query(pageSize: Constants.DetailsPageSize);
                var eventsTask = _mediator.Send(eventsQuery, cancellationToken);

                var balanceQuery = new GetDioceseBalance.Query();
                var balanceTask = _mediator.Send(balanceQuery, cancellationToken);

                var archdeaconryResults = await archdeaconriesTask;
                var parishResults = await parishesTask;
                var congregationResults = await congregationsTask;
                var eventResults = await eventsTask;
                var balance = await balanceTask;

                return new DioceseDetails(
                    archdeaconryResults,
                    parishResults,
                    congregationResults,
                    eventResults,
                    balance);
            }
        }
    }
}
