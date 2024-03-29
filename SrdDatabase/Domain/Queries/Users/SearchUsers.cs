﻿using MediatR;
using SrdDatabase.Data.Queries.Users;
using SrdDatabase.Models.Users;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Users
{
    public class SearchUsers
    {
        public class Query : UserParameters, IRequest<UserResults>
        {
            public Query(
                sbyte? userTypeId = null,
                string name = null,
                string username = null,
                bool hideRoot = true,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base
                    (userTypeId,
                    name,
                    username,
                    hideRoot,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, UserResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<UserResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetUsers.Query(
                        null,
                        request.UserTypeId,
                        request.Name,
                        request.Username,
                        request.HideRoot,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
