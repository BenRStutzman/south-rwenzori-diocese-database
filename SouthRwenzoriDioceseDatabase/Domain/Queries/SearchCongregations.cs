using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using SouthRwenzoriDioceseDatabase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Domain.Queries
{
    public class SearchCongregations
    {
        public class Query : IRequest<IEnumerable<Congregation>>
        {
            public string Name { get; }


            public int? ArchdeaconryId { get; }

            public int? ParishId { get; }

            public Query(
                string name = null,
                int? archdeaconryId = null,
                int? parishId = null)
            {
                Name = name;
                ArchdeaconryId = archdeaconryId;
                ParishId = parishId;
            }
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
                return await _mediator.Send(
                    new GetCongregations.Query(
                        archdeaconryId: request.ArchdeaconryId,
                        parishId: request.ParishId),
                    cancellationToken);
            }
        }
    }
}
