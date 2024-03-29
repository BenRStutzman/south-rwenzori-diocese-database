﻿using MediatR;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Models.Events;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Events
{
    public class GetEventById
    {
        public class Query : IRequest<Event>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Event>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Event> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetEvents.Query(request.Id), cancellationToken);
                
                return results.Events.Single();
            }
        }
    }
}
