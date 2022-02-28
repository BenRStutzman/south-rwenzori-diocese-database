using MediatR;
using SrdDatabase.Data.Queries.Quotas;
using SrdDatabase.Models.Quotas;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Quotas
{
    public class SearchQuotas
    {
        public class Query : QuotaParameters, IRequest<QuotaResults>
        {
            public Query(
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                int? startYear = null,
                int? endYear = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base(
                    archdeaconryId,
                    parishId,
                    congregationId,
                    startYear,
                    endYear,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, QuotaResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<QuotaResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetQuota.Query(
                        null,
                        request.ArchdeaconryId,
                        request.ParishId,
                        request.CongregationId,
                        request.StartYear,
                        request.EndYear,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
