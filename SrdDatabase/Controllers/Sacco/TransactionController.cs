using MediatR;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using System.Collections.Generic;
using System.Threading.Tasks;
using SrdDatabase.Models.Sacco.Transactions;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Sacco.Transactions;
using SrdDatabase.Domain.Commands.Sacco.Transactions;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers.Sacco
{
    [ApiController]
    [Authorize(UserRole.Sacco)]
    [Route("api/sacco/[controller]")]
    public class TransactionController : BaseController
    {
        private readonly IMediator _mediator;

        public TransactionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Transaction> GetById(int id)
        {
            return await _mediator.Send(new GetTransactionById.Query(id));
        }

        [HttpGet("details/{id}")]
        public async Task<TransactionDetails> Details(int id)
        {
            return await _mediator.Send(new GetTransactionDetails.Query(id));
        }

        [HttpPost]
        public async Task<IActionResult> Receipt(int id)
        {
            var receipt = await _mediator.Send(new GetTransactionReceipt.Query(id));
            return File(receipt.Data, "text/csv", receipt.FileName);
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Transaction>> GetAll()
        {
            return await _mediator.Send(new GetAllTransactions.Query());
        }

        [HttpPost("search")]
        public async Task<TransactionResults> Search(SearchTransactions.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddTransaction.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditTransaction.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteTransaction.Command command)
        {
            var response = await _mediator.Send(command);
            return DeleteResult(response);
        }
    }
}
