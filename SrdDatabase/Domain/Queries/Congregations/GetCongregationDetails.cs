using MediatR;
using SrdDatabase.Data.Queries.Censuses;
using SrdDatabase.Data.Queries.Quotas;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Data.Queries.Payments;
using SrdDatabase.Models.Congregations;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Data.Queries.Congregations;

namespace SrdDatabase.Domain.Queries.Congregations
{
    public class GetCongregationDetails
    {
        public class Query : IRequest<CongregationDetails>
        {
            [Range(1, int.MaxValue)]
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
                
                var populationTask = _mediator.Send(new GetCongregationPopulation.Query(request.Id), cancellationToken);

                var eventsQuery = new GetEvents.Query(
                    congregationId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var eventsTask = _mediator.Send(eventsQuery, cancellationToken);

                var paymentsQuery = new GetPayments.Query(
                    congregationId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);

                var quotasQuery = new GetQuotas.Query(
                    congregationId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var quotasTask = _mediator.Send(quotasQuery, cancellationToken);

                var congregation = await congregationTask;
                var population = await populationTask;
                var eventResults = await eventsTask;
                var paymentResults = await paymentsTask;
                var quotaResults = await quotasTask;

                return new CongregationDetails(
                    congregation,
                    population,
                    eventResults,
                    paymentResults,
                    quotaResults);
            }
        }
    }
}
