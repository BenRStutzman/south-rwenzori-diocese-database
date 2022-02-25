using MediatR;
using SrdDatabase.Data.Queries.Censuses;
using SrdDatabase.Data.Queries.Charges;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Data.Queries.Payments;
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

                var paymentsQuery = new GetPayments.Query(
                    parishId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);

                var chargesQuery = new GetCharges.Query(
                    parishId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var chargesTask = _mediator.Send(chargesQuery, cancellationToken);

                var censusesQuery = new GetCensuses.Query(
                    parishId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var censusesTask = _mediator.Send(censusesQuery, cancellationToken);

                var parish = await parishTask;
                var congregationResults = await congregationsTask;
                var eventsResults = await eventsTask;
                var paymentResults = await paymentsTask;
                var chargeResults = await chargesTask;
                var censusResults = await censusesTask;

                return new ParishDetails(
                    parish,
                    congregationResults,
                    eventsResults,
                    paymentResults,
                    chargeResults,
                    censusResults);
            }
        }
    }
}
