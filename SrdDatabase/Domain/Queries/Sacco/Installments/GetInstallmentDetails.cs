using MediatR;
using SrdDatabase.Models.Sacco.Installments;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Installments
{
    public class GetInstallmentDetails
    {
        public class Query : IRequest<InstallmentDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, InstallmentDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<InstallmentDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _mediator.Send(new GetInstallmentById.Query(request.Id), cancellationToken);

                return new InstallmentDetails(user);
            }
        }
    }
}
