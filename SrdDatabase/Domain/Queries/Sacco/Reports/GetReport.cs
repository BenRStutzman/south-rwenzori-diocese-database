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
                var memberTask = _mediator.Send(new GetMemberById.Query(request.MemberId), cancellationToken);
                
                var endDate = request.EndDate ?? DateTime.Today;
                var dates = ReportHelper.Dates(request.StartDate, endDate);
                var header = new[] { "Date", "Description", "Amount (Shares)", "Amount (Savings)", "Shares Value", "Balance" };

                var member = await memberTask;

                var dataTask = MemberRows(request.StartDate, endDate, member, cancellationToken);

                var fileName = $"{Regex.Replace(member.Name, "[^A-Za-z0-9]", "")}_AccountReport_{dates}.csv";

                var data = await dataTask;

                return ReportHelper.WriteReport(data.Prepend(header), fileName);
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
                    if (date >= startDate)
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
                        ReportHelper.DateString(startDate),
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
                        $"Interest (${distribution.InterestPercentage}% of savings)",
                        null,
                        distribution.Interest,
                        5
                    ));

                    transactionRows.Add(new TransactionRow(
                        distribution.Date,
                        $"Dividend (${distribution.DividendPercentage}% of shares)",
                        null,
                        distribution.Dividend,
                        6
                    ));
                }

                rows.AddRange(transactionRows
                    .OrderBy(row => row.Date)
                    .ThenBy(row => row.Order)
                    .Select(row => new[] {
                            ReportHelper.DateString(row.Date),
                            row.Description,
                            row.Shares.ToString(),
                            row.Savings.ToString()
                        }
                    )
                );

                rows.Add(new[] {
                        ReportHelper.DateString(endDate),
                        "Ending balance",
                        endingBalances.Shares.ToString(),
                        endingBalances.SharesValue.ToString(),
                        endingBalances.Savings.ToString(),
                        endingBalances.Balance.ToString()
                    }
                );

                return rows;
            }
        }
    }
}
