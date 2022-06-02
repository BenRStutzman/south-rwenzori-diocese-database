using MediatR;
using SrdDatabase.Data.Queries.Sacco.Installments;
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
                var installmentTask = _mediator.Send(new GetInstallmentById.Query(request.Id), cancellationToken);
                var fineWindowsTask = _mediator.Send(new GetInstallmentFineWindows.Query(request.Id), cancellationToken);

                var installment = await installmentTask;
                var fineWindows = await fineWindowsTask;

                return new InstallmentDetails(installment, fineWindows);
            }
        }
    }
}
