using MediatR;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using System.Collections.Generic;
using System.Threading.Tasks;
using SrdDatabase.Models.Sacco.Installments;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Sacco.Installments;
using SrdDatabase.Domain.Commands.Sacco.Installments;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers.Sacco
{
    [ApiController]
    [Authorize(UserRole.Sacco)]
    [Route("api/sacco/[controller]")]
    public class InstallmentController : BaseController
    {
        private readonly IMediator _mediator;

        public InstallmentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Installment> GetById(int id)
        {
            return await _mediator.Send(new GetInstallmentById.Query(id));
        }

        [HttpGet("details/{id}")]
        public async Task<InstallmentDetails> Details(int id)
        {
            return await _mediator.Send(new GetInstallmentDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Installment>> GetAll()
        {
            return await _mediator.Send(new GetAllInstallments.Query());
        }

        [HttpPost("search")]
        public async Task<InstallmentResults> Search(SearchInstallments.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddInstallment.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditInstallment.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteInstallment.Command command)
        {
            var response = await _mediator.Send(command);
            return DeleteResult(response);
        }
    }
}
