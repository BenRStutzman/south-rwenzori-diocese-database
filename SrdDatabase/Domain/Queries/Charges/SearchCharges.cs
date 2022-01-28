using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Data.Queries.Charges;
using SrdDatabase.Models.Charges;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Charges
{
    public class SearchCharges
    {
        public class Query : ChargeParameters, IRequest<ChargeResults>
        {
            public Query(
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                int? startYear = null,
                int? endYear = null,
                int pageNumber = 0) : base(
                    archdeaconryId,
                    parishId,
                    congregationId,
                    startYear,
                    endYear,
                    pageNumber)
            {
            }
        }

        public class Handler : IRequestHandler<Query, ChargeResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ChargeResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetCharges.Query(
                        null,
                        request.ArchdeaconryId,
                        request.ParishId,
                        request.CongregationId,
                        request.StartYear,
                        request.EndYear,
                        request.PageNumber,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
