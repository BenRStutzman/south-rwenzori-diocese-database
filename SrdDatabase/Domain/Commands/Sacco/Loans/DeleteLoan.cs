using MediatR;
using SrdDatabase.Data.Queries.Sacco.Payments;
using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Commands.Sacco.Loans
{
    public class DeleteLoan
    {
        public class Command : IRequest<DeleteResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, DeleteResponse>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<DeleteResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var paymentsQuery = new GetPayments.Query(loanId: request.Id);
                var paymentResults = await _mediator.Send(paymentsQuery, cancellationToken);

                if (paymentResults.TotalResults > 0)
                {
                    return DeleteResponse.ForError(
                        "Unable to delete this loan because it has payments associated with it. " +
                        "Please delete all of those payments or move them to another loan, " +
                        "then try again."
                    );
                }

                await _mediator.Send(
                    new Data.Commands.Sacco.Loans.DeleteLoan.Command(request.Id),
                    cancellationToken);

                return DeleteResponse.ForSuccess();
            }
        }
    }
}
