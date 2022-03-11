using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Archdeaconries;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Data.Queries.Parishes;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Data.Queries.Payments;
using SrdDatabase.Data.Queries.Quotas;
using SrdDatabase.Data.Queries.Censuses;

namespace SrdDatabase.Domain.Queries.Archdeaconries
{
    public class GetArchdeaconryDetails
    {
        public class Query : IRequest<ArchdeaconryDetails>
        {
            [Range(1, int.MaxValue)]
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
                    archdeaconryId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var parishesTask = _mediator.Send(parishesQuery, cancellationToken);

                var congregationsQuery = new GetCongregations.Query(
                    archdeaconryId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var congregationsTask = _mediator.Send(congregationsQuery, cancellationToken);

                var eventsQuery = new GetEvents.Query(
                    archdeaconryId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var eventsTask = _mediator.Send(eventsQuery, cancellationToken);

                var paymentsQuery = new GetPayments.Query(
                    archdeaconryId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);

                var quotasQuery = new GetQuotas.Query(
                    archdeaconryId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var quotasTask = _mediator.Send(quotasQuery, cancellationToken);

                var censusesQuery = new GetCensuses.Query(
                    archdeaconryId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var censusesTask = _mediator.Send(censusesQuery, cancellationToken);

                var archdeaconry = await archdeaconryTask;
                var parishResults = await parishesTask;
                var congregationResults = await congregationsTask;
                var eventResults = await eventsTask;
                var paymentResults = await paymentsTask;
                var quotaResults = await quotasTask;
                var censusResults = await censusesTask;

                return new ArchdeaconryDetails(
                    archdeaconry,
                    parishResults,
                    congregationResults,
                    eventResults,
                    paymentResults,
                    quotaResults,
                    censusResults);
            }
        }
    }
}
