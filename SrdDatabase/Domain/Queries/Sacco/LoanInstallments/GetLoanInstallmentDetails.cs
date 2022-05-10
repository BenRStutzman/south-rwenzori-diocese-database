using MediatR;
using SrdDatabase.Models.Sacco.LoanInstallments;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.LoanInstallments
{
    public class GetLoanInstallmentDetails
    {
        public class Query : IRequest<LoanInstallmentDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, LoanInstallmentDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<LoanInstallmentDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _mediator.Send(new GetLoanInstallmentById.Query(request.Id), cancellationToken);

                return new LoanInstallmentDetails(user);
            }
        }
    }
}
