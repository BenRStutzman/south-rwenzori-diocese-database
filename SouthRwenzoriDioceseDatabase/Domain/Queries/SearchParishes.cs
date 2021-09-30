﻿using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using SouthRwenzoriDioceseDatabase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Domain.Queries
{
    public class SearchParishes
    {
        public class Query : IRequest<IEnumerable<Parish>>
        {
            public int? ArchdeaconryId { get; }

            public Query(int? archdeaconryId = null)
            {
                ArchdeaconryId = archdeaconryId;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Parish>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Parish>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetParishes.Query(archdeaconryId: request.ArchdeaconryId),
                    cancellationToken);
            }
        }
    }
}
