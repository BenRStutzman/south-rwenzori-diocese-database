using MediatR;
using SrdDatabase.Domain.Queries.Sacco.Members;
using SrdDatabase.Models.Reports;
using SrdDatabase.Models.Sacco.Members;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Sacco.Transactions;
using SrdDatabase.Data.Queries.Sacco.Transactions;
using SrdDatabase.Data.Queries.Sacco.Distributions;
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

                receiptNumberString = receiptNumberString.Replace("_", " #");
                var rows = new List<IEnumerable<string>>
                {
                    new[]
                    {
                        $"Transaction Receipt{receiptNumberString}"
                    },
                    Enumerable.Empty<string>(),
                    new[] {
                        "Date",
                        ReportHelper.DateString(transaction.Date)
                    },
                    new[]
                    {
                        "Account #",
                        transaction.AccountNumber.ToString()
                    },
                    new[]
                    {
                        "Name",
                        transaction.Member
                    },

                };

                return ReportHelper.WriteReport(rows, fileName);
            }
        }
    }
}
