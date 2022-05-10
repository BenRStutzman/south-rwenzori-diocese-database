using MediatR;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using System.Collections.Generic;
using System.Threading.Tasks;
using SrdDatabase.Models.Sacco.LoanInstallments;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Sacco.LoanInstallments;
using SrdDatabase.Domain.Commands.Sacco.LoanInstallments;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers.Sacco
{
    [ApiController]
    [Authorize(UserRole.Sacco)]
    [Route("api/sacco/[controller]")]
    public class LoanInstallmentController : BaseController
    {
        private readonly IMediator _mediator;

        public LoanInstallmentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<LoanInstallment> GetById(int id)
        {
            return await _mediator.Send(new GetLoanInstallmentById.Query(id));
        }

        [HttpGet("details/{id}")]
        public async Task<LoanInstallmentDetails> Details(int id)
        {
            return await _mediator.Send(new GetLoanInstallmentDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<LoanInstallment>> GetAll()
        {
            return await _mediator.Send(new GetAllLoanInstallments.Query());
        }

        [HttpPost("search")]
        public async Task<LoanInstallmentResults> Search(SearchLoanInstallments.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddLoanInstallment.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditLoanInstallment.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteLoanInstallment.Command command)
        {
            var response = await _mediator.Send(command);
            return DeleteResult(response);
        }
    }
}
