using MediatR;
using SrdDatabase.Domain.Queries.Sacco.Members;
using GeneralReports = SrdDatabase.Models.Reports;
using SrdDatabase.Models.Sacco.Members;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Sacco.Reports;
using SrdDatabase.Data.Queries.Sacco.Reports;
using SrdDatabase.Data.Queries.Sacco.Transactions;
using SrdDatabase.Data.Queries.Sacco.Distributions;
using SrdDatabase.Helpers;

namespace SrdDatabase.Domain.Queries.Sacco.Reports
{
    public class GetReport
    {
        public class Query : ReportParameters, IRequest<GeneralReports.Report>
        {
            public Query(
                int? memberId = null,
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
                var dates = ReportHelper.Dates(request.StartDate, endDate);
                IEnumerable<IEnumerable<string>> header;
                string subject;
                Task<IEnumerable<IEnumerable<string>>> dataTask;

                if (request.MemberId.HasValue)
                {
                    var memberTask = _mediator.Send(new GetMemberById.Query(request.MemberId.Value), cancellationToken);
                    header = new[] {
                        new[] { "Date", "Description", "Shares", "Value of Shares", "Savings", "Balance" }
                    };
                    
                    var member = await memberTask;

                    dataTask = MemberRows(request.StartDate, endDate, member, cancellationToken);

                    subject = $"{member.AccountNumber}_{member.Name}";
                }
                else
                {
                    dataTask = DioceseRows(request.StartDate, endDate, cancellationToken);

                    var startDateString = GeneralHelper.FormattedDate(request.StartDate);
                    var endDateString = GeneralHelper.FormattedDate(endDate);

                    header = new[] {
                        new[] {
                            string.Empty,
                            string.Empty,
                            request.StartDate.HasValue ? $"Balances as of {startDateString}" : "Starting balances",
                            string.Empty,
                            string.Empty,
                            string.Empty,
                            $"Balances as of {endDateString}",
                            string.Empty,
                            string.Empty,
                            string.Empty,
                            request.StartDate.HasValue ? $"Change from {startDateString} to {endDateString}" : $"Change through {endDateString}"
                        },
                        new[] {
                            "Account #",
                            "Name",
                            "Shares",
                            "Value of Shares",
                            "Savings",
                            "Balance",
                            "Shares",
                            "Value of Shares",
                            "Savings",
                            "Balance",
                            "Shares",
                            "Value of Shares",
                            "Savings",
                            "Balance"
                        }
                    };
                    subject = "SouthRwenzoriDiocese_SACCO";
                }

                var fileName = $"{Regex.Replace(subject, "[^A-Za-z0-9_]", "")}_AccountReport_{dates}.csv";

                var data = await dataTask;

                return ReportHelper.WriteReport(header.Concat(data), fileName);
            }

            private async Task<IEnumerable<IEnumerable<string>>> MemberRows(
                DateTime? startDate,
                DateTime endDate,
                Member member,
                CancellationToken cancellationToken
                )
            {
                var startingBalancesTask = startDate.HasValue
                    ? _mediator.Send(
                        new GetMemberBalances.Query(member.Id, startDate.Value, false),
                        cancellationToken)
                    : Task.FromResult(new MemberBalances(0, 0, 0, 0));

                var transactionsQuery = new GetTransactions.Query(
                    memberId: member.Id,
                    startDate: startDate,
                    endDate: endDate);
                var transactionsTask = _mediator.Send(transactionsQuery, cancellationToken);

                var distributionsQuery = new GetDistributionsApplied.Query(member.Id, startDate, endDate);
                var distributionsTask = _mediator.Send(distributionsQuery, cancellationToken);

                var endingBalancesQuery = new GetMemberBalances.Query(member.Id, endDate);
                var endingBalancesTask = _mediator.Send(endingBalancesQuery, cancellationToken);

                var transactionRows = new List<TransactionRow>();

                var yearOfFees = 1;
                var date = member.AutoFeesStartDate;

                while (yearOfFees <= member.YearsOfFees && date <= endDate)
                {
                    if (date >= startDate || startDate == null)
                    {
                        transactionRows.Add(new TransactionRow(
                            date,
                            "Annual membership fee",
                            null,
                            -Constants.SaccoAnnualFee,
                            0
                        ));
                    }

                    yearOfFees++;
                    date = date.AddYears(1);
                }

                var startingBalances = await startingBalancesTask;
                var transactionResults = await transactionsTask;
                var distributionResults = await distributionsTask;
                var endingBalances = await endingBalancesTask;

                var rows = new List<IEnumerable<string>>
                {
                    new[] {
                        GeneralHelper.FormattedDate(startDate),
                        "Starting balances",
                        startingBalances.Shares.ToString(),
                        startingBalances.SharesValue.ToString(),
                        startingBalances.Savings.ToString(),
                        startingBalances.Balance.ToString()
                    },
                };

                foreach (var transaction in transactionResults.Transactions)
                {
                    var actionString = TransactionHelper.TransactionAction(transaction);
                    var receiptString = transaction.ReceiptNumber.HasValue ? $" (Receipt {transaction.ReceiptNumber})" : "";
                    var amount = transaction.IsContribution ? transaction.Amount : -transaction.Amount;
                    sbyte order;

                    if (transaction.IsShares) {
                        if (transaction.IsContribution) {
                            order = 3;
                        } else {
                            order = 4;
                        }
                    }
                    else
                    {
                        if (transaction.IsContribution) {
                            order = 1;
                        } else
                        {
                            order = 2;
                        }
                    }

                    transactionRows.Add(new TransactionRow(
                        transaction.Date,
                        actionString + receiptString,
                        transaction.IsShares ? amount : null,
                        transaction.IsShares ? null : amount,
                        order
                    ));
                }

                foreach (var distribution in distributionResults.DistributionsApplied)
                {
                    transactionRows.Add(new TransactionRow(
                        distribution.Date,
                        $"Interest ({distribution.InterestPercentage}% of savings)",
                        null,
                        distribution.Interest,
                        5
                    ));

                    transactionRows.Add(new TransactionRow(
                        distribution.Date,
                        $"Dividend ({distribution.DividendPercentage}% of shares)",
                        null,
                        distribution.Dividend,
                        6
                    ));
                }

                rows.AddRange(transactionRows
                    .OrderBy(row => row.Date)
                    .ThenBy(row => row.Order)
                    .Select(row => new[] {
                            GeneralHelper.FormattedDate(row.Date),
                            row.Description,
                            row.Shares.ToString(),
                            row.Shares.HasValue ? (row.Shares * Constants.SaccoSharePrice).ToString() : string.Empty,
                            row.Savings.ToString()
                        }
                    )
                );

                rows.Add(new[] {
                        GeneralHelper.FormattedDate(endDate),
                        "Ending balances",
                        endingBalances.Shares.ToString(),
                        endingBalances.SharesValue.ToString(),
                        endingBalances.Savings.ToString(),
                        endingBalances.Balance.ToString()
                    }
                );

                return rows;
            }

            private async Task<IEnumerable<IEnumerable<string>>> DioceseRows(
                DateTime? startDate,
                DateTime endDate,
                CancellationToken cancellationToken
                )
            {
                var membersTask = _mediator.Send(new GetAllMembers.Query(), cancellationToken);
                var members = await membersTask;

                var memberRowsTask = members
                    .AsParallel()
                    .AsOrdered()
                    .Select(member => MemberRow(startDate, endDate, member, cancellationToken));

                return await Task.WhenAll(memberRowsTask);
            }

            private async Task<IEnumerable<string>> MemberRow(
                DateTime? startDate,
                DateTime endDate,
                Member member,
                CancellationToken cancellationToken)
            {
                var startingBalancesTask = startDate.HasValue
                    ? _mediator.Send(
                        new GetMemberBalances.Query(member.Id, startDate.Value, false),
                        cancellationToken)
                    : Task.FromResult(new MemberBalances(0, 0, 0, 0));

                var endingBalancesQuery = new GetMemberBalances.Query(member.Id, endDate);
                var endingBalancesTask = _mediator.Send(endingBalancesQuery, cancellationToken);

                var startingBalances = await startingBalancesTask;
                var endingBalances = await endingBalancesTask;

                return new[]
                {
                    member.AccountNumber.ToString(),
                    member.Name,
                    startingBalances.Shares.ToString(),
                    startingBalances.SharesValue.ToString(),
                    startingBalances.Savings.ToString(),
                    startingBalances.Balance.ToString(),
                    endingBalances.Shares.ToString(),
                    endingBalances.SharesValue.ToString(),
                    endingBalances.Savings.ToString(),
                    endingBalances.Balance.ToString(),
                    (endingBalances.Shares - startingBalances.Shares).ToString(),
                    (endingBalances.SharesValue - startingBalances.SharesValue).ToString(),
                    (endingBalances.Savings - startingBalances.Savings).ToString(),
                    (endingBalances.Balance - startingBalances.Balance).ToString()
                };
            }
        }
    }
}
