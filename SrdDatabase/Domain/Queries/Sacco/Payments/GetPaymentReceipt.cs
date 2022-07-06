using MediatR;
using SrdDatabase.Models.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Helpers;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Domain.Queries.Sacco.Loans;

namespace SrdDatabase.Domain.Queries.Sacco.Payments
{
    public class GetPaymentReceipt
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
                var paymentTask = _mediator.Send(new GetPaymentById.Query(request.Id), cancellationToken);
                var payment = await paymentTask;

                var loanTask = _mediator.Send(new GetLoanById.Query(payment.LoanId), cancellationToken);
                
                var receiptNumberString = payment.ReceiptNumber.HasValue ? $"_{payment.ReceiptNumber}" : "";
                var fileName = $"PaymentReceipt{receiptNumberString}.csv";

                var loan = await loanTask;

                var rows = new List<IEnumerable<string>>
                {
                    new[]
                    {
                        $"Payment Receipt{receiptNumberString.Replace("_", " #")}",
                    },
                    new[]
                    {
                        "South Rwenzori Diocese SACCO"
                    },
                    Enumerable.Empty<string>(),
                    new[] {
                        "Date",
                        ReportHelper.DateString(payment.Date),
                    },
                    new[]
                    {
                        "Name",
                        payment.Member,
                    },
                    new[]
                    {
                        "Account #",
                        payment.AccountNumber.ToString(),
                    },
                    Enumerable.Empty<string>(),
                    new[]
                    {
                        "Total paid",
                        $"{payment.Amount} UGX",
                    },
                    new[]
                    {
                        "Principal",
                        $"{payment.Principal} UGX",
                    },
                    new[]
                    {
                        "Interest",
                        $"{payment.Interest} UGX",
                    },
                    new[]
                    {
                        "Fines paid",
                        $"{payment.FinePaid} UGX",
                    },
                    Enumerable.Empty<string>(),
                    new[]
                    {
                        "Loan",
                        $"{loan.LoanType} loan for {loan.Principal} UGX",
                    },
                    new[]
                    {
                        $"Details as of {ReportHelper.DateString(DateTime.Today)}:"
                    },
                    new[]
                    {
                        "Balance",
                        $"{loan.Balance} UGX"
                    },
                    new[]
                    {
                        "Progress",
                        $"{loan.PercentagePaid}%"
                    },
                    Enumerable.Empty<string>(),
                    new[]
                    {
                        "Helped by",
                        payment.UpdatedBy,
                    },
                    new[]
                    {
                        "Thank you for your payment!",
                    },
                };

                return ReportHelper.WriteReport(rows, fileName);
            }
        }
    }
}
