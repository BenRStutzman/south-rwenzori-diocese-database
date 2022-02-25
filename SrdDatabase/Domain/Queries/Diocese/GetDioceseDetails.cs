﻿using MediatR;
using SrdDatabase.Data.Queries.Archdeaconries;
using SrdDatabase.Data.Queries.Censuses;
using SrdDatabase.Data.Queries.Charges;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Data.Queries.Parishes;
using SrdDatabase.Data.Queries.Payments;
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

                var paymentsQuery = new GetPayments.Query(pageSize: Constants.DetailsPageSize);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);

                var chargesQuery = new GetCharges.Query(pageSize: Constants.DetailsPageSize);
                var chargesTask = _mediator.Send(chargesQuery, cancellationToken);

                var censusesQuery = new GetCensuses.Query(pageSize: Constants.DetailsPageSize);
                var censusesTask = _mediator.Send(censusesQuery, cancellationToken);

                var detailsQuery = new Data.Queries.Diocese.GetDioceseDetails.Query();
                var detailsTask = _mediator.Send(detailsQuery, cancellationToken);

                var archdeaconryResults = await archdeaconriesTask;
                var parishResults = await parishesTask;
                var congregationResults = await congregationsTask;
                var eventResults = await eventsTask;
                var paymentResults = await paymentsTask;
                var chargeResults = await chargesTask;
                var censusResults = await censusesTask;
                var details = await detailsTask;

                return new DioceseDetails(
                    archdeaconryResults,
                    parishResults,
                    congregationResults,
                    eventResults,
                    paymentResults,
                    chargeResults,
                    censusResults,
                    details);
            }
        }
    }
}
