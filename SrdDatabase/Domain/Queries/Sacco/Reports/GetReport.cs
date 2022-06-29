using CsvHelper;
using CsvHelper.Configuration;
using MediatR;
using SrdDatabase.Domain.Queries.Sacco.Members;
using GeneralReports = SrdDatabase.Models.Reports;
using SrdDatabase.Models.Sacco.Members;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Sacco.Reports;
using SrdDatabase.Data.Queries.Sacco.Reports;

namespace SrdDatabase.Domain.Queries.Sacco.Reports
{
    public class GetReport
    {
        public class Query : ReportParameters, IRequest<GeneralReports.Report>
        {
            public Query(
                int memberId,
                DateTime? startDate = null,
                DateTime? endDate = null) : base(
                    memberId,
                    startDate,
                    endDate)
            {
            }
        }

        public class Handler : IRequestHandler<Query, GeneralReports.Report>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<GeneralReports.Report> Handle(Query request, CancellationToken cancellationToken)
            {
                var endDate = request.EndDate ?? DateTime.Today;
                var dates = $"{(request.StartDate.HasValue ? $"{DateString(request.StartDate.Value)}_to" : "through")}_{DateString(endDate)}";
                var commonHeader = new[] { "Date", "Description", "Amount", "Shares", "Shares Value", "Savings", "Balance" };
                string subject;
                IEnumerable<string> header;
                Task<IEnumerable<IEnumerable<string>>> dataTask;

                var memberTask = _mediator.Send(new GetMemberById.Query(request.MemberId), cancellationToken);
                header = (new[] { "Member" }).Concat(commonHeader);

                var member = await memberTask;
                dataTask = MemberRows(request.StartDate, endDate, member, 1, _mediator, cancellationToken);

                subject = $"{member.Name} Member";

                var fileName = $"{Regex.Replace(subject, "[^A-Za-z0-9]", "")}_QuotaRemittanceReport_{dates}.csv";

                var data = await dataTask;

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

            public static async Task<IEnumerable<IEnumerable<string>>> MemberRows(
                DateTime? startDate,
                DateTime endDate,
                Member member,
                int offset,
                IMediator _mediator,
                CancellationToken cancellationToken
                )
            {
                var startingBalancesTask = startDate.HasValue
                    ? _mediator.Send(
                        new GetMemberBalances.Query(member.Id, startDate.Value, false),
                        cancellationToken)
                    : Task.FromResult(new MemberBalances(0, 0, 0, 0));

                var quotasQuery = new GetFees.Query(
                    memberId: member.Id,
                    startYear: startDate?.Year,
                    endYear: endDate.Year);
                var quotasTask = _mediator.Send(quotasQuery, cancellationToken);

                var paymentsQuery = new GetTransactions.Query(
                    memberId: member.Id,
                    startDate: startDate,
                    endDate: endDate);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);

                var endingBalancesQuery = new GetMemberBalances.Query(member.Id, endDate);
                var endingBalancesTask = _mediator.Send(endingBalancesQuery, cancellationToken);

                var startingBalance = await startingBalancesTask;
                var quotaResults = await quotasTask;
                var paymentResults = await paymentsTask;
                var endingBalance = await endingBalancesTask;

                var rows = new List<IEnumerable<string>>
                {
                    RowWithOffset(new[] { member.Name }, offset - 1),
                    RowWithOffset(
                        new[] {
                                DateString(startDate),
                                "Starting balances",
                                startingBalance.Shares.ToString(),
                                startingBalance.SharesValue.ToString(),
                                startingBalance.Savings.ToString(),
                                startingBalance.Balance.ToString()
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
                            $"{year} Membership Fee",
                            quota.AmountPerYear
                        ));
                    }
                }

                foreach (var payment in paymentResults.Payments)
                {
                    transactionRows.Add(new TransactionRow(
                        DateString(payment.Date),
                        $"Payment{(payment.ReceiptNumber.HasValue ? $" (Receipt {payment.ReceiptNumber})" : "")}",
                        -payment.Amount
                    ));
                }

                rows.AddRange(transactionRows
                    .OrderBy(row => row.Date)
                    .ThenBy(row => row.Description)
                    .Select(row => RowWithOffset(
                        new[] {
                                row.Date,
                                row.Description,
                                row.Amount.ToString() },
                        offset)
                    )
                );

                rows.Add(RowWithOffset(
                    new[] {
                        DateString(endDate),
                        "Ending balance",
                    },
                    offset
                ).Concat(RowWithOffset(
                    new[] { endingBalance.ToString() },
                    1
                )));

                rows.Add(Enumerable.Empty<string>());
                
                return rows;
            }

            public static GeneralReports.Report WriteReport(IEnumerable<IEnumerable<string>> rows, string fileName)
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

                return new GeneralReports.Report(fileName, data);
            }
        }
    }
}
