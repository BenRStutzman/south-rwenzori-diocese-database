﻿using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Payments;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Payments;
using SrdDatabase.Domain.Commands.Payments;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize(UserRole.Viewer)]
    [Route("api/[controller]")]
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

        [Authorize(UserRole.Accountant)]
        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddPayment.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Accountant)]
        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditPayment.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Accountant)]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeletePayment.Command command)
        {
            var response = await _mediator.Send(command);
            return DeleteResult(response);
        }
    }
}
