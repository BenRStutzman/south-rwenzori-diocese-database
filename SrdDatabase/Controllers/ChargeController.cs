using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Attributes;
using SrdDatabase.Domain.Commands;
using SrdDatabase.Models.Charges;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Charges;
using SrdDatabase.Domain.Commands.Charges;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize(UserRole.Accountant)]
    [Route("api/[controller]")]
    public class ChargeController : BaseController
    {
        private readonly IMediator _mediator;

        public ChargeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Charge> GetById(int id)
        {
            return await _mediator.Send(new GetChargeById.Query(id));
        }


        [HttpGet("details/{id}")]
        public async Task<ChargeDetails> Details(int id)
        {
            return await _mediator.Send(new GetChargeDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Charge>> GetAll()
        {
            return await _mediator.Send(new GetAllCharges.Query());
        }

        [HttpPost("search")]
        public async Task<ChargeResults> Search(SearchCharges.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddCharge.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditCharge.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteCharge.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }
    }
}
