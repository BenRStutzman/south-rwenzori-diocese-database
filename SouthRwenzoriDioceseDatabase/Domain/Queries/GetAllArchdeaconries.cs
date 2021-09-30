﻿using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using SouthRwenzoriDioceseDatabase.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Domain.Queries
{
    public class GetAllArchdeaconries
    {
        public class Query : IRequest<IEnumerable<Archdeaconry>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Archdeaconry>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Archdeaconry>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(new GetArchdeaconries.Query(), cancellationToken);
            }
        }
    }
}
