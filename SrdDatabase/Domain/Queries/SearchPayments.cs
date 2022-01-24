using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Payments;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchPayments
    {
        public class Query : PaymentParameters, IRequest<PaymentResults>
        {
            public Query(
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0) : base(
                    archdeaconryId,
                    parishId,
                    congregationId,
                    startDate,
                    endDate,
                    pageNumber)
            {
            }
        }

        public class Handler : IRequestHandler<Query, PaymentResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<PaymentResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetPayments.Query(
                        null,
                        request.ArchdeaconryId,
                        request.ParishId,
                        request.CongregationId,
                        request.StartDate,
                        request.EndDate,
                        request.PageNumber,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
