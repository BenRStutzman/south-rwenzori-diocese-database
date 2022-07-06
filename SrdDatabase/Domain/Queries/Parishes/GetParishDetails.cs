using MediatR;
using SrdDatabase.Data.Queries.Quotas;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Data.Queries.Payments;
using SrdDatabase.Models.Parishes;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Data.Queries.Parishs;

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

                var populationTask = _mediator.Send(new GetParishPopulation.Query(request.Id), cancellationToken);
                
                var congregationsQuery = new GetCongregations.Query(
                    parishId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var congregationsTask = _mediator.Send(congregationsQuery, cancellationToken);

                var eventsQuery = new GetEvents.Query(
                    parishId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var eventsTask = _mediator.Send(eventsQuery, cancellationToken);

                var paymentsQuery = new GetPayments.Query(
                    parishId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);

                var quotasQuery = new GetQuotas.Query(
                    parishId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var quotasTask = _mediator.Send(quotasQuery, cancellationToken);

                var parish = await parishTask;
                var population = await populationTask;
                var congregationResults = await congregationsTask;
                var eventResults = await eventsTask;
                var paymentResults = await paymentsTask;
                var quotaResults = await quotasTask;

                return new ParishDetails(
                    parish,
                    population,
                    congregationResults,
                    eventResults,
                    paymentResults,
                    quotaResults);
            }
        }
    }
}
