using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Transactions;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchTransactions
    {
        public class Query : TransactionParameters, IRequest<ChargeResults>
        {
            public Query(
                byte? transactionTypeId = null,
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                int? pageSize = null) : base(
                    transactionTypeId,
                    archdeaconryId,
                    parishId,
                    congregationId,
                    startDate,
                    endDate,
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
                    new GetTransactions.Query(
                        null,
                        request.TransactionTypeId,
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
