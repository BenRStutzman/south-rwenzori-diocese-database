using CsvHelper;
using CsvHelper.Configuration;
using MediatR;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Data.Queries.Parishes;
using SrdDatabase.Data.Queries.Payments;
using SrdDatabase.Data.Queries.Quotas;
using SrdDatabase.Data.Queries.Reports;
using SrdDatabase.Domain.Queries.Archdeaconries;
using SrdDatabase.Domain.Queries.Congregations;
using SrdDatabase.Domain.Queries.Parishes;
using SrdDatabase.Models.Archdeaconries;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Parishes;
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
                var endDate = request.EndDate ?? DateTime.Today;
                var dates = $"{(request.StartDate.HasValue ? $"{DateString(request.StartDate.Value)}_to" : "through")}_{DateString(endDate)}";
                var commonHeader = new[] { "Date", "Description", "Receipt #", "Amount (UGX)" };
                string subject;
                IEnumerable<string> header;
                IEnumerable<IEnumerable<string>> data;

                if (request.CongregationId.HasValue)
                {
                    var congregation = await _mediator.Send(new GetCongregationById.Query(request.CongregationId.Value), cancellationToken);
                    subject = $"{congregation.Name} Congregation";
                    header = (new[] { "Congregation" }).Concat(commonHeader);
                    data = await CongregationRows(request.StartDate, endDate, congregation, 1, _mediator, cancellationToken);
                }
                else if (request.ParishId.HasValue)
                {
                    var parish = await _mediator.Send(new GetParishById.Query(request.ParishId.Value), cancellationToken);
                    subject = $"{parish.Name} Parish";
                    header = (new[] { "Parish", "Congregation" }).Concat(commonHeader);
                    data = await ParishRows(request.StartDate, endDate, parish, 2, _mediator, cancellationToken);
                }
                else if (request.ArchdeaconryId.HasValue)
                {
                    var archdeaconry = await _mediator.Send(new GetArchdeaconryById.Query(request.ArchdeaconryId.Value), cancellationToken);
                    subject = $"{archdeaconry.Name} Archdeaconry";
                    header = (new[] { "Archdeaconry", "Parish", "Congregation" }).Concat(commonHeader);
                    data = await ArchdeaconryRows(request.StartDate, endDate, archdeaconry, 3, _mediator, cancellationToken);
                }
                else
                {
                    subject = "South Rwenzori Diocese";
                    header = (new[] { "Diocese", "Archdeaconry", "Parish", "Congregation" }).Concat(commonHeader);
                    data = await DioceseRows(request.StartDate, endDate, 4, _mediator, cancellationToken);
                }

                var fileName = $"{Regex.Replace(subject, "[^A-Za-z0-9]", "")}_QuotaRemittanceReport_{dates}";

                return WriteReport(data.Prepend(header), fileName);
            }

            private static IEnumerable<string> RowWithOffset(IEnumerable<string> row, int offset)
            {
                return Enumerable.Repeat(string.Empty, offset).Concat(row);
            }

            private static string DateString(DateTime? date)
            {
                return date.HasValue ? $"{date.Value.Year}-{date.Value.Month}-{date.Value.Day}" : string.Empty;
            }

            public static IEnumerable<string> BalanceRow(
                DateTime? date,
                string description,
                int balance,
                int offset)
            {
                return RowWithOffset(
                    new[] {
                            DateString(date),
                            description,
                            string.Empty,
                            balance.ToString()
                    },
                    offset
                );
            }

            public static async Task<IEnumerable<IEnumerable<string>>> CongregationRows(
                DateTime? startDate,
                DateTime endDate,
                Congregation congregation,
                int offset,
                IMediator _mediator,
                CancellationToken cancellationToken
                )
            {
                var rows = new List<IEnumerable<string>>
                {
                    RowWithOffset(new[] { congregation.Name }, offset - 1)
                };

                int startingBalance;

                if (startDate.HasValue)
                {
                    var startingBalanceQuery = new GetCongregationBalance.Query(congregation.Id, startDate.Value, false);
                    startingBalance = await _mediator.Send(startingBalanceQuery, cancellationToken);
                }
                else
                {
                    startingBalance = 0;
                }

                rows.Add(BalanceRow(
                    startDate,
                    "Starting balance",
                    startingBalance,
                    offset));

                var quotaQuery = new GetQuotas.Query(
                    congregationId: congregation.Id,
                    startYear: startDate?.Year,
                    endYear: endDate.Year);
                var quotaResults = await _mediator.Send(quotaQuery, cancellationToken);

                var transactionRows = new List<TransactionRow>();

                foreach (var quota in quotaResults.Quotas)
                {
                    var startYear = startDate.HasValue ? Math.Max(startDate.Value.Year, quota.StartYear) : quota.StartYear;
                    var endYear = quota.EndYear.HasValue ? Math.Min(quota.EndYear.Value,endDate.Year) : endDate.Year;

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
                    startDate: startDate,
                    endDate: endDate);
                var paymentResults = await _mediator.Send(paymentQuery, cancellationToken);

                foreach (var payment in paymentResults.Payments)
                {
                    transactionRows.Add(new TransactionRow(
                        DateString(payment.Date),
                        "Payment",
                        -payment.Amount,
                        payment.ReceiptNumber
                    ));
                }

                rows.AddRange(transactionRows
                    .OrderBy(row => row.Date)
                    .ThenBy(row => row.Description)
                    .Select(row => RowWithOffset(
                        new[] {
                                row.Date,
                                row.Description,
                                Convert.ToString(row.ReceiptNumber),
                                row.Amount.ToString() },
                        offset)
                    )
                );

                var endingBalanceQuery = new GetCongregationBalance.Query(congregation.Id, endDate);
                var endingBalance = await _mediator.Send(endingBalanceQuery, cancellationToken);
                rows.Add(BalanceRow(
                    endDate,
                    "Ending balance",
                    endingBalance,
                    offset));

                return rows;
            }

            public static async Task<IEnumerable<IEnumerable<string>>> ParishRows(
                DateTime? startDate,
                DateTime endDate,
                Parish parish,
                int offset,
                IMediator _mediator,
                CancellationToken cancellationToken)
            {
                var rows = new List<IEnumerable<string>>
                {
                    RowWithOffset(new[] { parish.Name }, offset - 2)
                };

                int startingBalance;

                if (startDate.HasValue)
                {
                    var startingBalanceQuery = new GetParishBalance.Query(parish.Id, startDate.Value, false);
                    startingBalance = await _mediator.Send(startingBalanceQuery, cancellationToken);
                }
                else
                {
                    startingBalance = 0;
                }

                rows.Add(BalanceRow(
                    startDate,
                    $"Starting balance for {parish.Name} Parish",
                    startingBalance,
                    offset));

                var congregationsQuery = new GetCongregations.Query(parishId: parish.Id);
                var congregationResults = await _mediator.Send(congregationsQuery, cancellationToken);

                foreach (var congregation in congregationResults.Congregations)
                {
                    var congregationRows = await CongregationRows(
                        startDate,
                        endDate,
                        congregation,
                        offset,
                        _mediator,
                        cancellationToken);
                    rows.AddRange(congregationRows);
                }

                rows.Add(Enumerable.Empty<string>());

                var endingBalanceQuery = new GetParishBalance.Query(parish.Id, endDate);
                var endingBalance = await _mediator.Send(endingBalanceQuery, cancellationToken);
                rows.Add(BalanceRow(
                    endDate,
                    $"Ending balance for {parish.Name} Parish",
                    endingBalance,
                    offset));

                return rows;
            }

            public static async Task<IEnumerable<IEnumerable<string>>> ArchdeaconryRows(
                DateTime? startDate,
                DateTime endDate,
                Archdeaconry archdeaconry,
                int offset,
                IMediator _mediator,
                CancellationToken cancellationToken)
            {
                var rows = new List<IEnumerable<string>>
                {
                    RowWithOffset(new[] { archdeaconry.Name }, offset - 3)
                };

                int startingBalance;

                if (startDate.HasValue)
                {
                    var startingBalanceQuery = new GetArchdeaconryBalance.Query(archdeaconry.Id, startDate.Value, false);
                    startingBalance = await _mediator.Send(startingBalanceQuery, cancellationToken);
                }
                else
                {
                    startingBalance = 0;
                }

                rows.Add(BalanceRow(
                    startDate,
                    $"Starting balance for {archdeaconry.Name} Archdeaconry",
                    startingBalance,
                    offset));

                var parishesQuery = new GetParishes.Query(archdeaconryId: archdeaconry.Id);
                var parishResults = await _mediator.Send(parishesQuery, cancellationToken);

                foreach (var parish in parishResults.Parishes)
                {
                    var parishRows = await ParishRows(
                        startDate,
                        endDate,
                        parish,
                        offset,
                        _mediator,
                        cancellationToken);
                    rows.AddRange(parishRows);
                }

                rows.Add(Enumerable.Empty<string>());

                var endingBalanceQuery = new GetArchdeaconryBalance.Query(archdeaconry.Id, endDate);
                var endingBalance = await _mediator.Send(endingBalanceQuery, cancellationToken);
                rows.Add(BalanceRow(
                    endDate,
                    $"Ending balance for {archdeaconry.Name} Archdeaconry",
                    endingBalance,
                    offset));

                return rows;
            }

            public static async Task<IEnumerable<IEnumerable<string>>> DioceseRows(
                DateTime? startDate,
                DateTime endDate,
                int offset,
                IMediator _mediator,
                CancellationToken cancellationToken)
            {
                var rows = new List<IEnumerable<string>>
                {
                    RowWithOffset(new[] { "South Rwenzori" }, offset - 4)
                };

                int startingBalance;

                if (startDate.HasValue)
                {
                    var startingBalanceQuery = new GetDioceseBalance.Query(startDate.Value, false);
                    startingBalance = await _mediator.Send(startingBalanceQuery, cancellationToken);
                }
                else
                {
                    startingBalance = 0;
                }

                rows.Add(BalanceRow(
                    startDate,
                    $"Starting balance for South Rwenzori Diocese",
                    startingBalance,
                    offset));

                var archdeaconriesQuery = new GetAllArchdeaconries.Query();
                var archdeaconries = await _mediator.Send(archdeaconriesQuery, cancellationToken);

                foreach (var archdeaconry in archdeaconries)
                {
                    var archdeaconryRows = await ArchdeaconryRows(
                        startDate,
                        endDate,
                        archdeaconry,
                        offset,
                        _mediator,
                        cancellationToken);
                    rows.AddRange(archdeaconryRows);
                }

                rows.Add(Enumerable.Empty<string>());

                var endingBalanceQuery = new GetDioceseBalance.Query(endDate);
                var endingBalance = await _mediator.Send(endingBalanceQuery, cancellationToken);
                rows.Add(BalanceRow(
                    endDate,
                    $"Ending balance for South Rwenzori Diocese",
                    endingBalance,
                    offset));

                return rows;
            }

            public static Report WriteReport(IEnumerable<IEnumerable<string>> rows, string fileName)
            {
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
        }
    }
}
