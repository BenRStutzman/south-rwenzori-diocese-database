using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Data.Queries.Charges;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Data.Queries.Payments;
using SrdDatabase.Models.Congregations;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

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

                var eventsQuery = new GetEvents.Query(
                    congregationId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var eventsTask = _mediator.Send(eventsQuery, cancellationToken);

                var paymentsQuery = new GetPayments.Query(
                    congregationId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);

                var chargesQuery = new GetCharges.Query(
                    congregationId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var chargesTask = _mediator.Send(chargesQuery, cancellationToken);

                var congregation = await congregationTask;
                var eventResults = await eventsTask;
                var paymentResults = await paymentsTask;
                var chargeResults = await chargesTask;

                return new CongregationDetails(
                    congregation,
                    eventResults,
                    paymentResults,
                    chargeResults);
            }
        }
    }
}
