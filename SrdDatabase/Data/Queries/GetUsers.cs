using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System;
using SrdDatabase.Services;
using SrdDatabase.Models;

namespace SrdDatabase.Data.Queries
{
    public class GetUsers
    {
        public class Query : IRequest<IEnumerable<User>>
        {
            public int? Id { get; }

            public byte? UserTypeId { get; }

            public string Name { get; }

            public string Username { get; }


            public Query(
                int? id = null,
                byte? userTypeId = null,
                string name = null,
                string username = null)
            {
                Id = id;
                UserTypeId = userTypeId;
                Name = name;
                Username = username;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<User>>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_users";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<IEnumerable<User>> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QueryAsync<User>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
