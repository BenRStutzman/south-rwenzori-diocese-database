﻿using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Congregations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchCongregations
    {
        public class Query : IRequest<CongregationResults>
        {
            public CongregationParameters Parameters { get; }

            public int PageNumber { get; }

            public Query(CongregationParameters parameters, int pageNumber)
            {
                Parameters = parameters;
                PageNumber = pageNumber;
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
                        parameters: request.Parameters,
                        pageNumber: request.PageNumber,
                        pageSize: Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
