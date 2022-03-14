using CsvHelper;
using CsvHelper.Configuration;
using MediatR;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Data.Queries.Payments;
using SrdDatabase.Data.Queries.Quotas;
using SrdDatabase.Domain.Queries.Archdeaconries;
using SrdDatabase.Domain.Queries.Congregations;
using SrdDatabase.Domain.Queries.Parishes;
using SrdDatabase.Models.Reports;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
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
                var endDate = request.EndDate.Value;
                var dates = $"{(request.StartDate.HasValue ? $"{DateString(request.StartDate.Value)} to" : "through")} {DateString(endDate)}";
                string subject;
                int offset;
                IEnumerable<string> headerPrefix;
                GetCongregations.Query congregationsQuery;

                if (request.CongregationId.HasValue)
                {
                    var congregation = await _mediator.Send(new GetCongregationById.Query(request.CongregationId.Value));
                    subject = $"{congregation.Name} Congregation";
                    congregationsQuery = new GetCongregations.Query(congregation.Id);
                    headerPrefix = Enumerable.Empty<string>();
                    offset = 0;
                }
                else if (request.ParishId.HasValue)
                {
                    var parish = await _mediator.Send(new GetParishById.Query(request.ParishId.Value));
                    subject = $"{parish.Name} Parish";
                    congregationsQuery = new GetCongregations.Query(parishId: parish.Id);
                    headerPrefix = new[] { "Congregation" };
                    offset = 1;
                }
                else if (request.ArchdeaconryId.HasValue)
                {
                    var archdeaconry = await _mediator.Send(new GetArchdeaconryById.Query(request.ArchdeaconryId.Value));
                    subject = $"{archdeaconry.Name} Archdeaconry";
                    congregationsQuery = new GetCongregations.Query(archdeaconryId: archdeaconry.Id);
                    headerPrefix = new[] { "Parish", "Congregation" };
                    offset = 2;
                }
                else
                {
                    subject = "South Rwenzori Diocese";
                    congregationsQuery = new GetCongregations.Query();
                    headerPrefix = new[] { "Archdeaconry", "Parish", "Congregation" };
                    offset = 3;
                }

                var fileName = Regex.Replace($"{subject}_QuotaRemittanceReport_{dates}", "[^A-Za-z0-9_]", "");

                var rows = new List<IEnumerable<string>>
                {
                    headerPrefix.Concat(new[] { "Date", "Description", "Amount (UGX" }),
                    Array.Empty<string>(),
                };

                var congregationResults = await _mediator.Send(congregationsQuery, cancellationToken);

                foreach (var congregation in congregationResults.Congregations)
                {
                    if (offset > 0) {
                        rows.Add(RowWithOffset(new[] { congregation.Name }, offset - 1));
                    }

                    var startingBalanceQuery = new GetCongregationBalance.Query(congregation.Id, request.StartDate.Value, false);
                    var startingBalance = request.StartDate.HasValue
                       ? await _mediator.Send(startingBalanceQuery, cancellationToken)
                       : 0;
                    rows.Add(
                        RowWithOffset(
                            new[] {
                                request.StartDate.HasValue ? DateString(request.StartDate.Value) : "",
                                "Starting balance",
                                startingBalance.ToString()
                            },
                            offset)
                    );

                    var quotaQuery = new GetQuotas.Query(
                        congregationId: congregation.Id,
                        startYear: request.StartDate?.Year,
                        endYear: endDate.Year);
                    var quotaResults = await _mediator.Send(quotaQuery, cancellationToken);

                    var transactionRows = new List<TransactionRow>();

                    foreach (var quota in quotaResults.Quotas)
                    {
                        var startYear = request.StartDate.HasValue ? Math.Max(request.StartDate.Value.Year, quota.StartYear) : quota.StartYear;
                        var endYear = quota.EndYear.HasValue ? Math.Min(quota.EndYear.Value, endDate.Year) : endDate.Year;

                        for (var year = startYear; year <= endYear; year++)
                        {
                            transactionRows.Add(new TransactionRow(
                                $"{year}-01-01",
                                $"{year} Quota",
                                quota.AmountPerYear
                            ));
                        }
                    }

                    var paymentQuery = new GetPayments.Query(
                        congregationId: congregation.Id,
                        startDate: request.StartDate,
                        endDate: endDate);
                    var paymentResults = await _mediator.Send(paymentQuery, cancellationToken);

                    foreach (var payment in paymentResults.Payments)
                    {
                        transactionRows.Add(new TransactionRow(
                            DateString(payment.Date),
                            "Payment",
                            -payment.Amount
                        ));
                    }

                    rows.AddRange(transactionRows
                        .OrderBy(row => row.Date)
                        .ThenBy(row => row.Description)
                        .Select(row => RowWithOffset(
                            new[] { row.Date, row.Description, row.Amount.ToString() },
                            offset)
                        )
                    );

                    var endingBalanceQuery = new GetCongregationBalance.Query(congregation.Id, endDate);
                    var endingBalance = await _mediator.Send(endingBalanceQuery);
                    rows.Add(
                        RowWithOffset(
                            new[] {
                                DateString(endDate),
                                "Ending balance",
                                endingBalance.ToString()
                            }, offset
                        )
                    );
                }

                var configuration = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    HasHeaderRecord = false
                };

                using var memoryStream = new MemoryStream();
                using var streamWriter = new StreamWriter(memoryStream);
                using var csvWriter = new CsvWriter(streamWriter, configuration);

                foreach (var row in rows)
                {
                    foreach (var field in row)
                    {
                        csvWriter.WriteField(field);
                    }

                    csvWriter.NextRecord();
                }

                streamWriter.Flush();
                var data = memoryStream.ToArray();

                return new Report(fileName, data);
            }

            private static IEnumerable<string> RowWithOffset(IEnumerable<string> row, int offset)
            {
                return Enumerable.Repeat(string.Empty, offset).Concat(row);
            }

            private static string DateString(DateTime date)
            {
                return $"{date.Year}-{date.Month}-{date.Day}";
            }
        }
    }
}
