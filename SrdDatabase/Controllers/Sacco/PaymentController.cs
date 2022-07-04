using MediatR;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using System.Collections.Generic;
using System.Threading.Tasks;
using SrdDatabase.Models.Sacco.Payments;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Sacco.Payments;
using SrdDatabase.Domain.Commands.Sacco.Payments;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers.Sacco
{
    [ApiController]
    [Authorize(UserRole.Sacco)]
    [Route("api/sacco/[controller]")]
    public class PaymentController : BaseController
    {
        private readonly IMediator _mediator;

        public PaymentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Payment> GetById(int id)
        {
            return await _mediator.Send(new GetPaymentById.Query(id));
        }

        [HttpGet("details/{id}")]
        public async Task<PaymentDetails> Details(int id)
        {
            return await _mediator.Send(new GetPaymentDetails.Query(id));
        }

        [HttpGet("receipt/{id}")]
        public async Task<IActionResult> Receipt(int id)
        {
            var receipt = await _mediator.Send(new GetPaymentReceipt.Query(id));
            return File(receipt.Data, "text/csv", receipt.FileName);
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Payment>> GetAll()
        {
            return await _mediator.Send(new GetAllPayments.Query());
        }

        [HttpPost("search")]
        public async Task<PaymentResults> Search(SearchPayments.Query query)
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
            return DeleteResult(response);
        }
    }
}
