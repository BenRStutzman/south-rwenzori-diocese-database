﻿using MediatR;
using SrdDatabase.Models.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Helpers;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Domain.Queries.Sacco.Transactions
{
    public class GetTransactionReceipt
    {
        public class Query : IRequest<Report>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
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
                var transactionTask = _mediator.Send(new GetTransactionById.Query(request.Id), cancellationToken);
                var transaction = await transactionTask;

                var receiptNumberString = transaction.ReceiptNumber.HasValue ? $"_{transaction.ReceiptNumber}" : "";
                var fileName = $"TransactionReceipt{receiptNumberString}.csv";

                var rows = new List<IEnumerable<string>>
                {
                    new[]
                    {
                        "Transaction Receipt",
                        string.Empty,
                        "South Rwenzori Diocese SACCO"
                    },
                    Enumerable.Empty<string>(),
                    new[]
                    {
                        "Account #",
                        transaction.AccountNumber.ToString(),
                        string.Empty,
                        "Name",
                        transaction.Member,
                    },
                    new[] {
                        "Date",
                        ReportHelper.DateString(transaction.Date),
                        string.Empty,
                        "Receipt #",
                        transaction.ReceiptNumber.HasValue ? transaction.ReceiptNumber.ToString() : "Not set",
                    },
                    Enumerable.Empty<string>(),
                    new[]
                    {
                        TransactionHelper.TransactionAction(transaction),
                        string.Empty,
                        "Amount",
                        $"{(transaction.IsShares ? transaction.Amount * Constants.SaccoSharePrice : transaction.Amount)} UGX"
                    },
                };

                if (transaction.Notes != null)
                {
                    rows.Add(new[]
                    {
                        "Notes",
                        transaction.Notes
                    });
                }

                rows.AddRange(new[]
                {
                    Enumerable.Empty<string>(),
                    new[]
                    {
                        "Assisted by",
                        transaction.UpdatedBy,
                        string.Empty,
                        "Thank you for your transaction!"
                    },
                });

                return ReportHelper.WriteReport(rows, fileName);
            }
        }
    }
}
