using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Congregations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchCongregations
    {
        public class Query : CongregationParameters, IRequest<CongregationResults>
        {
            public Query(
                string name = null,
                int? parishId = null,
                int? archdeaconryId = null,
                int pageNumber = 0): base(name, parishId, archdeaconryId, pageNumber)
            {
            }
        }

        public class Handler : IRequestHandler<Query, CongregationResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<CongregationResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetCongregations.Query(
                        null,
                        request.Name,
                        request.ParishId,
                        request.ArchdeaconryId,
                        request.PageNumber,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
