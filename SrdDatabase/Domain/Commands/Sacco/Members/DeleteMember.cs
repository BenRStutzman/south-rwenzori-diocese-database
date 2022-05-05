using MediatR;
using SrdDatabase.Data.Queries.Sacco.Loans;
using SrdDatabase.Data.Queries.Sacco.Transactions;
using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Commands.Sacco.Members
{
    public class DeleteMember
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
                var loansQuery = new GetLoans.Query(memberId: request.Id);
                var loansTask = _mediator.Send(loansQuery, cancellationToken);

                var transactionsQuery = new GetTransactions.Query(memberId: request.Id);
                var transactionsTask = _mediator.Send(transactionsQuery, cancellationToken);

                var loanResults = await loansTask;
                var transactionResults = await transactionsTask;

                var associatedItems = loanResults.TotalResults > 0 ? "loans"
                    : transactionResults.TotalResults > 0 ? "transactions"
                    : null;

                if (!string.IsNullOrEmpty(associatedItems))
                {
                    return DeleteResponse.ForError(
                        $"Unable to delete this member because they have {associatedItems} associated with them. " +
                        $"Please delete all of those {associatedItems} or move them to another member, " +
                        "then try again."
                    );
                }

                await _mediator.Send(
                    new Data.Commands.Sacco.Members.DeleteMember.Command(request.Id),
                    cancellationToken);

                return DeleteResponse.ForSuccess();
            }
        }
    }
}
