using CsvHelper;
using MediatR;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Domain.Queries.Archdeaconries;
using SrdDatabase.Domain.Queries.Congregations;
using SrdDatabase.Domain.Queries.Parishes;
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

                if (request.CongregationId.HasValue)
                {
                    var congregation = await _mediator.Send(new GetCongregationById.Query(request.CongregationId.Value));
                    subject = $"{congregation.Name} Congregation";
                }
                else if (request.ParishId.HasValue)
                {
                    var parish = await _mediator.Send(new GetParishById.Query(request.ParishId.Value));
                    subject = $"{parish.Name} Parish";
                }
                else if (request.ArchdeaconryId.HasValue)
                {
                    var archdeaconry = await _mediator.Send(new GetArchdeaconryById.Query(request.ArchdeaconryId.Value));
                    subject = $"{archdeaconry.Name} Archdeaconry";
                }
                else
                {
                    subject = "South Rwenzori Diocese";
                }

                var safeSubject = Regex.Replace(subject, "[^A-Za-z0-9]", "");
                var fileDates = $"{(request.StartDate.HasValue ? $"{DateString(request.StartDate.Value)}_to" : "through")}_{DateString(endDate)}";
                var fileName = $"{safeSubject}_QuotaRemittanceReport_{fileDates}.csv";

                var rows = new List<ReportRow>();
                var congregations = await _mediator.Send(new GetAllCongregations.Query(), cancellationToken);
                
                foreach (var congregation in congregations)
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
                using var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

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
