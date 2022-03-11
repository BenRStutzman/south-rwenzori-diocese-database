using MediatR;
using SrdDatabase.Data.Queries.Quotas;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Data.Queries.Payments;
using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Commands.Congregations
{
    public class DeleteCongregation
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
                var eventsQuery = new GetEvents.Query(congregationId: request.Id);
                var eventsTask = _mediator.Send(eventsQuery, cancellationToken);

                var paymentsQuery = new GetPayments.Query(congregationId: request.Id);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);
                
                var quotasQuery = new GetQuotas.Query(congregationId: request.Id);
                var quotasTask = _mediator.Send(quotasQuery, cancellationToken);

                var eventResults = await eventsTask;
                var paymentResults = await paymentsTask;
                var quotaResults = await quotasTask;

                var associatedItems = eventResults.TotalResults > 0 ? "events"
                    : paymentResults.TotalResults > 0 ? "payments"
                    : quotaResults.TotalResults > 0 ? "quotas"
                    : null;

                if (!string.IsNullOrEmpty(associatedItems))
                {
                    return DeleteResponse.ForError(
                        $"Unable to delete this congregation because it has {associatedItems} associated with it. " +
                        $"Please delete all of those {associatedItems} or move them to another congregation, " +
                        "then try again."
                    );
                }

                await _mediator.Send(
                    new Data.Commands.Congregations.DeleteCongregation.Command(request.Id), cancellationToken);

                return DeleteResponse.ForSuccess();
            }
        }
    }
}
