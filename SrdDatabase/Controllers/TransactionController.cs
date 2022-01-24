using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Attributes;
using SrdDatabase.Domain.Commands;
using SrdDatabase.Models.Transactions;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize(UserRole.Accountant)]
    [Route("api/[controller]")]
    public class TransactionController : BaseController
    {
        private readonly IMediator _mediator;

        public TransactionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Charge> GetById(int id)
        {
            return await _mediator.Send(new GetTransactionById.Query(id));
        }


        [HttpGet("details/{id}")]
        public async Task<TransactionDetails> Details(int id)
        {
            return await _mediator.Send(new GetTransactionDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Charge>> GetAll()
        {
            return await _mediator.Send(new GetAllTransactions.Query());
        }

        [HttpGet("types")]
        public async Task<IEnumerable<TransactionType>> GetTypes()
        {
            return await _mediator.Send(new GetAllTransactionTypes.Query());
        }

        [HttpPost("search")]
        public async Task<ChargeResults> Search(SearchTransactions.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddPayment.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditPayment.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeletePayment.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }
    }
}
