using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Sacco.Loans;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Sacco.Loans;
using SrdDatabase.Domain.Commands.Sacco.Loans;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize(UserRole.Sacco)]
    [Route("api/sacco/[controller]")]
    public class LoanController : BaseController
    {
        private readonly IMediator _mediator;

        public LoanController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Loan> GetById(int id)
        {
            return await _mediator.Send(new GetLoanById.Query(id));
        }


        [HttpGet("details/{id}")]
        public async Task<LoanDetails> Details(int id)
        {
            return await _mediator.Send(new GetLoanDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Loan>> GetAll()
        {
            return await _mediator.Send(new GetAllLoans.Query());
        }

        [HttpGet("types")]
        public async Task<IEnumerable<LoanType>> GetTypes()
        {
            return await _mediator.Send(new GetAllLoanTypes.Query());
        }

        [HttpPost("search")]
        public async Task<LoanResults> Search(SearchLoans.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddLoan.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> Edit(EditLoan.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return Ok(await _mediator.Send(command));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteLoan.Command command)
        {
            var response = await _mediator.Send(command);
            return DeleteResult(response);
        }
    }
}
