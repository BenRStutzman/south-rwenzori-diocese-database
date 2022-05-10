using MediatR;
using SrdDatabase.Data.Queries.Sacco.Installments;
using SrdDatabase.Models.Sacco.Installments;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Installments
{
    public class GetInstallmentById
    {
        public class Query : IRequest<Installment>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Installment>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Installment> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetInstallments.Query(request.Id), cancellationToken);
                return results.Installments.Single();
            }
        }
    }
}
