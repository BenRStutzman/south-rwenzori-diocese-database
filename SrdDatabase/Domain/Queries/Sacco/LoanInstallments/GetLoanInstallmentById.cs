using MediatR;
using SrdDatabase.Data.Queries.Sacco.LoanInstallments;
using SrdDatabase.Models.Sacco.LoanInstallments;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.LoanInstallments
{
    public class GetLoanInstallmentById
    {
        public class Query : IRequest<LoanInstallment>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, LoanInstallment>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<LoanInstallment> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetLoanInstallments.Query(request.Id), cancellationToken);
                return results.LoanInstallments.Single();
            }
        }
    }
}
