﻿using MediatR;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Models.Congregations;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Congregations
{
    public class GetAllCongregations
    {
        public class Query : IRequest<IEnumerable<Congregation>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Congregation>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Congregation>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetCongregations.Query(), cancellationToken);

                return results.Congregations;
            }
        }
    }
}
