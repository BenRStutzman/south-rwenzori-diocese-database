﻿using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using SouthRwenzoriDioceseDatabase.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Domain.Queries
{
    public class GetParishById
    {
        public class Query : IRequest<Parish>
        {
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Parish>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Parish> Handle(Query request, CancellationToken cancellationToken)
            {
                var parishes = await _mediator.Send(new GetParishes.Query(request.Id), cancellationToken);
                return parishes.Single();
            }
        }
    }
}
