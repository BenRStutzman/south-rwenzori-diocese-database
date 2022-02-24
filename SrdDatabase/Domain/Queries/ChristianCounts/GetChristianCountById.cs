﻿using MediatR;
using SrdDatabase.Data.Queries.ChristianCounts;
using SrdDatabase.Models.ChristianCounts;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.ChristianCounts
{
    public class GetChristianCountById
    {
        public class Query : IRequest<ChristianCount>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, ChristianCount>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ChristianCount> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetChristianCounts.Query(request.Id), cancellationToken);
                
                return results.ChristianCounts.Single();
            }
        }
    }
}
