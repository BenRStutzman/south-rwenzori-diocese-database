using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Diocese;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
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

                var transactionsQuery = new GetTransactions.Query(pageSize: Constants.DetailsPageSize);
                var transactionsTask = _mediator.Send(transactionsQuery, cancellationToken);

                var archdeaconryResults = await archdeaconriesTask;
                var parishResults = await parishesTask;
                var congregationResults = await congregationsTask;
                var eventResults = await eventsTask;
                var transactionResults = await transactionsTask;

                return new DioceseDetails(
                    archdeaconryResults,
                    parishResults,
                    congregationResults,
                    eventResults,
                    transactionResults);
            }
        }
    }
}
