using MediatR;
using SrdDatabase.Data.Queries.Sacco.Loans;
using SrdDatabase.Models.Sacco.Loans;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Loans
{
    public class GetLoanById
    {
        public class Query : IRequest<Loan>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Loan>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Loan> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetLoans.Query(request.Id), cancellationToken);
                return results.Loans.Single();
            }
        }
    }
}
