using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Events;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchEvents
    {
        public class Query : IRequest<EventResults>
        {
            public EventParameters Parameters { get; }

            public int PageNumber { get; }

            public Query(EventParameters parameters, int pageNumber)
            {
                Parameters = parameters;
                PageNumber = pageNumber;
            }
        }

        public class Handler : IRequestHandler<Query, EventResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<EventResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetEvents.Query(
                        parameters: request.Parameters,
                        pageNumber: request.PageNumber,
                        pageSize: Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
