using MediatR;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Data.Queries.Parishes;
using SrdDatabase.Data.Queries.Payments;
using SrdDatabase.Data.Queries.Quotas;
using SrdDatabase.Data.Queries.Reports;
using SrdDatabase.Domain.Queries.Archdeaconries;
using SrdDatabase.Domain.Queries.Congregations;
using SrdDatabase.Domain.Queries.Parishes;
using SrdDatabase.Helpers;
using SrdDatabase.Models.Archdeaconries;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Parishes;
using SrdDatabase.Models.Reports;
using System;
using System.Collections.Generic;
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
                var dates = ReportHelper.Dates(request.StartDate, endDate);
                var commonHeader = new[] { "Date", "Description", "Amount", "Congregation Balance" };
                string subject;
                IEnumerable<string> header;
                Task<IEnumerable<IEnumerable<string>>> dataTask;

                if (request.CongregationId.HasValue)
                {
                    var congregationTask = _mediator.Send(new GetCongregationById.Query(request.CongregationId.Value), cancellationToken);
                    header = (new[] { "Congregation" }).Concat(commonHeader);

                    var congregation = await congregationTask;
                    dataTask = CongregationRows(request.StartDate, endDate, congregation, 1, cancellationToken);

                    subject = $"{congregation.Name} Congregation";
                }
                else if (request.ParishId.HasValue)
                {
                    var parishTask = _mediator.Send(new GetParishById.Query(request.ParishId.Value), cancellationToken);
                    header = (new[] { "Parish", "Congregation" })
                        .Concat(commonHeader)
                        .Append("Parish Balance");

                    var parish = await parishTask;
                    dataTask = ParishRows(request.StartDate, endDate, parish, 2, cancellationToken);

                    subject = $"{parish.Name} Parish";
                }
                else if (request.ArchdeaconryId.HasValue)
                {
                    var archdeaconryTask = _mediator.Send(new GetArchdeaconryById.Query(request.ArchdeaconryId.Value), cancellationToken);
                    header = (new[] { "Archdeaconry", "Parish", "Congregation" })
                        .Concat(commonHeader)
                        .Concat(new[] { "Parish Balance", "Archdeaconry Balance" });

                    var archdeaconry = await archdeaconryTask;
                    dataTask = ArchdeaconryRows(request.StartDate, endDate, archdeaconry, 3, cancellationToken);

                    subject = $"{archdeaconry.Name} Archdeaconry";
                }
                else
                {
                    dataTask = DioceseRows(request.StartDate, endDate, 3, cancellationToken);

                    header = (new[] { "Archdeaconry", "Parish", "Congregation" })
                        .Concat(commonHeader)
                        .Concat(new[] { "Parish Balance", "Archdeaconry Balance", "Diocese Balance" });
                    subject = "South Rwenzori Diocese";
                }

                var fileName = $"{Regex.Replace(subject, "[^A-Za-z0-9]", "")}_QuotaRemittanceReport_{dates}.csv";

                var data = await dataTask;

                return ReportHelper.WriteReport(data.Prepend(header), fileName);
            }

            private async Task<IEnumerable<IEnumerable<string>>> CongregationRows(
                DateTime? startDate,
                DateTime endDate,
                Congregation congregation,
                int offset,
                CancellationToken cancellationToken
                )
            {
                var startingBalanceTask = startDate.HasValue
                    ? _mediator.Send(
                        new GetCongregationBalance.Query(congregation.Id, startDate.Value, false),
                        cancellationToken)
                    : Task.FromResult(0);

                var quotasQuery = new GetQuotas.Query(
                    congregationId: congregation.Id,
                    startYear: startDate?.Year,
                    endYear: endDate.Year);
                var quotasTask = _mediator.Send(quotasQuery, cancellationToken);

                var paymentsQuery = new GetPayments.Query(
                    congregationId: congregation.Id,
                    startDate: startDate,
                    endDate: endDate);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);

                var endingBalanceQuery = new GetCongregationBalance.Query(congregation.Id, endDate);
                var endingBalanceTask = _mediator.Send(endingBalanceQuery, cancellationToken);

                var startingBalance = await startingBalanceTask;
                var quotaResults = await quotasTask;
                var paymentResults = await paymentsTask;
                var endingBalance = await endingBalanceTask;

                var rows = new List<IEnumerable<string>>
                {
                    ReportHelper.RowWithOffset(new[] { congregation.Name }, offset - 1),
                    ReportHelper.RowWithOffset(
                        new[] {
                                GeneralHelper.FormattedDate(startDate),
                                "Starting balance",
                                startingBalance.ToString()
                        },
                        offset
                    )
                };

                var transactionRows = new List<TransactionRow>();

                foreach (var quota in quotaResults.Quotas)
                {
                    var startYear = startDate.HasValue ? Math.Max(startDate.Value.Year, quota.StartYear) : quota.StartYear;
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

                foreach (var payment in paymentResults.Payments)
                {
                    transactionRows.Add(new TransactionRow(
                        GeneralHelper.FormattedDate(payment.Date),
                        $"Payment{(payment.ReceiptNumber.HasValue ? $" (Receipt {payment.ReceiptNumber})" : "")}",
                        -payment.Amount
                    ));
                }

                rows.AddRange(transactionRows
                    .OrderBy(row => row.Date)
                    .ThenBy(row => row.Description)
                    .Select(row => ReportHelper.RowWithOffset(
                        new[] {
                                row.Date,
                                row.Description,
                                row.Amount.ToString() },
                        offset)
                    )
                );

                rows.Add(ReportHelper.RowWithOffset(
                    new[] {
                        GeneralHelper.FormattedDate(endDate),
                        "Ending balance",
                    },
                    offset
                ).Concat(ReportHelper.RowWithOffset(
                    new[] { endingBalance.ToString() },
                    1
                )));

                rows.Add(Enumerable.Empty<string>());
                
                return rows;
            }

            private async Task<IEnumerable<IEnumerable<string>>> ParishRows(
                DateTime? startDate,
                DateTime endDate,
                Parish parish,
                int offset,
                CancellationToken cancellationToken)
            {
                var congregationsQuery = new GetCongregations.Query(parishId: parish.Id);
                var congregationsTask = _mediator.Send(congregationsQuery, cancellationToken);

                var endingBalanceQuery = new GetParishBalance.Query(parish.Id, endDate);
                var endingBalanceTask = _mediator.Send(endingBalanceQuery, cancellationToken);

                var congregationResults = await congregationsTask;
                var congregationsRowsTasks = congregationResults.Congregations
                    .AsParallel()
                    .AsOrdered()
                    .Select(congregation =>
                        CongregationRows(
                            startDate,
                            endDate,
                            congregation,
                            offset,
                            cancellationToken)
                    );

                var congregationsRows = await Task.WhenAll(congregationsRowsTasks);
                var endingBalance = await endingBalanceTask;

                var rows = new List<IEnumerable<string>>
                {
                    ReportHelper.RowWithOffset(new[] { parish.Name }, offset - 2)
                };

                foreach (var congregationRows in congregationsRows)
                {
                    rows.AddRange(congregationRows);
                }

                rows.Add(ReportHelper.RowWithOffset(
                    new[] { $"Ending balance for {parish.Name} Parish" },
                    offset - 1
                ).Concat(ReportHelper.RowWithOffset(
                    new[] { endingBalance.ToString() },
                    4
                )));

                rows.Add(Enumerable.Empty<string>());

                return rows;
            }

            private async Task<IEnumerable<IEnumerable<string>>> ArchdeaconryRows(
                DateTime? startDate,
                DateTime endDate,
                Archdeaconry archdeaconry,
                int offset,
                CancellationToken cancellationToken)
            {
                var parishesQuery = new GetParishes.Query(archdeaconryId: archdeaconry.Id);
                var parishesTask = _mediator.Send(parishesQuery, cancellationToken);

                var endingBalanceQuery = new GetArchdeaconryBalance.Query(archdeaconry.Id, endDate);
                var endingBalanceTask = _mediator.Send(endingBalanceQuery, cancellationToken);

                var parishResults = await parishesTask;
                var parishesRowsTasks = parishResults.Parishes
                    .AsParallel()
                    .AsOrdered()
                    .Select(parish =>
                        ParishRows(
                            startDate,
                            endDate,
                            parish,
                            offset,
                            cancellationToken)
                    );

                var parishesRows = await Task.WhenAll(parishesRowsTasks);
                var endingBalance = await endingBalanceTask;

                var rows = new List<IEnumerable<string>>
                {
                    ReportHelper.RowWithOffset(new[] { archdeaconry.Name }, offset - 3)
                };

                foreach (var parishRows in parishesRows)
                {
                    rows.AddRange(parishRows);
                }

                rows.Add(ReportHelper.RowWithOffset(
                    new[] { $"Ending balance for {archdeaconry.Name} Archdeaconry" },
                    offset - 2
                ).Concat(ReportHelper.RowWithOffset(
                    new[] { endingBalance.ToString() },
                    6
                )));

                rows.Add(Enumerable.Empty<string>());

                return rows;
            }

            private async Task<IEnumerable<IEnumerable<string>>> DioceseRows(
                DateTime? startDate,
                DateTime endDate,
                int offset,
                CancellationToken cancellationToken)
            {
                var archdeaconriesQuery = new GetAllArchdeaconries.Query();
                var archdeaconriesTask = _mediator.Send(archdeaconriesQuery, cancellationToken);

                var endingBalanceQuery = new GetDioceseBalance.Query(endDate);
                var endingBalanceTask = _mediator.Send(endingBalanceQuery, cancellationToken);

                var archdeaconries = await archdeaconriesTask;
                var archdeaconriesRowsTasks = archdeaconries
                    .AsParallel()
                    .AsOrdered()
                    .Select(archdeaconry =>
                        ArchdeaconryRows(
                            startDate,
                            endDate,
                            archdeaconry,
                            offset,
                            cancellationToken)
                    );

                var archdeaconriesRows = await Task.WhenAll(archdeaconriesRowsTasks);
                var endingBalance = await endingBalanceTask;

                var rows = new List<IEnumerable<string>>();

                foreach (var archdeaconryRows in archdeaconriesRows)
                {
                    rows.AddRange(archdeaconryRows);
                }

                rows.Add(ReportHelper.RowWithOffset(
                    new[] { $"Ending balance for South Rwenzori Diocese" },
                    offset - 3
                ).Concat(ReportHelper.RowWithOffset(
                    new[] { endingBalance.ToString() },
                    8
                )));

                rows.Add(Enumerable.Empty<string>());

                return rows;
            }
        }
    }
}
