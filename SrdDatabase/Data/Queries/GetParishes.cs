﻿using Dapper;
using MediatR;
using SrdDatabase.Models.Parishes;
using SrdDatabase.Services;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Data.Queries
{
    public class GetParishes
    {
        public class Query : ParishParameters, IRequest<ParishResults>
        {
            public int? Id { get; }

            public int PageNumber { get; }

            public int? PageSize { get; }

            public Query(
                ParishParameters parameters = null, 
                int? id = null,
                int pageNumber = 0,
                int? pageSize = null
                ) : base(
                    parameters?.Name,
                    parameters?.ArchdeaconryId
                    )
            {
                Id = id;
                PageNumber = pageNumber;
                PageSize = pageSize;
            }
        }

        public class Handler : IRequestHandler<Query, ParishResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_parishes";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<ParishResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var users = results.Read<Parish>();

                return new ParishResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    users);
            }
        }
    }
}
