using CsvHelper;
using CsvHelper.Configuration;
using MediatR;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Domain.Queries.Archdeaconries;
using SrdDatabase.Domain.Queries.Congregations;
using SrdDatabase.Domain.Queries.Parishes;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Reports;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Reports
{
    public class GetReport
    {
        public class Query : ReportParameters, IRequest<Report>
        {
            public Query(
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                DateTime? startDate = null,
                DateTime? endDate = null) : base(
                    archdeaconryId,
                    parishId,
                    congregationId,
                    startDate,
                    endDate)
            {
            }
        }

        public class Handler : IRequestHandler<Query, Report>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Report> Handle(Query request, CancellationToken cancellationToken)
            {
                string subject;
                var endDate = request.EndDate.Value;
                GetCongregations.Query congregationsQuery;

                if (request.CongregationId.HasValue)
                {
                    var congregation = await _mediator.Send(new GetCongregationById.Query(request.CongregationId.Value));
                    subject = $"{congregation.Name} Congregation";
                    congregationsQuery = new GetCongregations.Query(congregation.Id);
                }
                else if (request.ParishId.HasValue)
                {
                    var parish = await _mediator.Send(new GetParishById.Query(request.ParishId.Value));
                    subject = $"{parish.Name} Parish";
                    congregationsQuery = new GetCongregations.Query(parishId: parish.Id);
                }
                else if (request.ArchdeaconryId.HasValue)
                {
                    var archdeaconry = await _mediator.Send(new GetArchdeaconryById.Query(request.ArchdeaconryId.Value));
                    subject = $"{archdeaconry.Name} Archdeaconry";
                    congregationsQuery = new GetCongregations.Query(archdeaconryId: archdeaconry.Id);
                }
                else
                {
                    subject = "South Rwenzori Diocese";
                    congregationsQuery = new GetCongregations.Query();
                }

                var congregationResults = await _mediator.Send(congregationsQuery, cancellationToken);

                var dates = $"{(request.StartDate.HasValue ? $"{DateString(request.StartDate.Value)} to" : "through")} {DateString(endDate)}";
                
                var reportName = $"{subject} Quota Remittance Report {dates}";
                var fileName = Regex.Replace($"{subject}_QuotaRemittanceReport_{dates}", "[^A-Za-z0-9_]", "");

                var rows = new List<ReportRow>();

                rows.Add(new ReportRow(reportName));

                foreach (var congregation in congregationResults.Congregations)
                {
                    rows.Add(new ReportRow(congregation.Name));

                    var startingBalance = request.StartDate.HasValue
                       ? await _mediator.Send(new GetCongregationBalance.Query(congregation.Id, request.StartDate.Value))
                       : 0;
                    rows.Add(new ReportRow("Starting balance", startingBalance));

                    var endingBalance = await _mediator.Send(new GetCongregationBalance.Query(congregation.Id, endDate));
                    rows.Add(new ReportRow("Ending balance", endingBalance));
                    rows.Add(new ReportRow());
                }

                using var memoryStream = new MemoryStream();
                using var streamWriter = new StreamWriter(memoryStream);

                var configuration = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    HasHeaderRecord = false
                };

                using var csvWriter = new CsvWriter(streamWriter, configuration);

                csvWriter.WriteRecords(rows);
                streamWriter.Flush();
                var data = memoryStream.ToArray();

                return new Report(fileName, data);
            }

            private static string DateString(DateTime date)
            {
                return $"{date.Year}-{date.Month}-{date.Day}";
            }
        }
    }
}
