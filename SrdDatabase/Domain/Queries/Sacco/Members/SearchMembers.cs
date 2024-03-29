﻿using MediatR;
using SrdDatabase.Data.Queries.Sacco.Members;
using SrdDatabase.Models.Sacco.Members;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Members
{
    public class SearchMembers
    {
        public class Query : MemberParameters, IRequest<MemberResults>
        {
            public Query(
                int? accountNumber = null,
                string name = null,
                bool? isChurch = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base
                    (accountNumber,
                    name,
                    isChurch,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, MemberResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<MemberResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetMembers.Query(
                        null,
                        request.AccountNumber,
                        request.Name,
                        request.IsChurch,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
