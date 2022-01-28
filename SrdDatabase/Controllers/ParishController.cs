using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Domain.Commands;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Parishes;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Parishes;
using SrdDatabase.Domain.Commands.Parishes;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ParishController : BaseController
    {
        private readonly IMediator _mediator;

        public ParishController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Parish> GetById(int id)
        {
            return await _mediator.Send(new GetParishById.Query(id));
        }

        [HttpGet("details/{id}")]
        public async Task<ParishDetails> Details(int id)
        {
            return await _mediator.Send(new GetParishDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Parish>> GetAll()
        {
            return await _mediator.Send(new GetAllParishes.Query());
        }

        [HttpPost("search")]
        public async Task<ParishResults> Search(SearchParishes.Query query)
        {
            return await _mediator.Send(query);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddParish.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditParish.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteParish.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }
    }
}
