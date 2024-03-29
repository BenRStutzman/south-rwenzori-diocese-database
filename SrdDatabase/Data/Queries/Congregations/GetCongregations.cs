﻿using Dapper;
using MediatR;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Services;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Data.Queries.Congregations
{
    public class GetCongregations
    {
        public class Query : CongregationParameters, IRequest<CongregationResults>
        {
            public Query(
                int? id = null,
                string name = null,
                int? parishId = null,
                int? archdeaconryId = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base(name,
                    parishId,
                    archdeaconryId,
                    pageNumber,
                    sortColumn,
                    sortDescending,
                    pageSize,
                    id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, CongregationResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_congregations";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<CongregationResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var congregations = results.Read<Congregation>();

                return new CongregationResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    congregations);
            }
        }
    }
}
