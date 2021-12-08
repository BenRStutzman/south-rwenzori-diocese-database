using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Data.Commands;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Archdeaconries;
using System.Collections.Generic;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ArchdeaconryController : Controller
    {
        private readonly IMediator _mediator;

        public ArchdeaconryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("details/{id}")]
        public async Task<ArchdeaconryDetails> Details(int id)
        {
            return await _mediator.Send(new GetArchdeaconryDetails.Query(id));
        }

        [HttpGet("{id}")]
        public async Task<Archdeaconry> GetById(int id)
        {
            return await _mediator.Send(new GetArchdeaconryById.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Archdeaconry>> GetAll()
        {
            return await _mediator.Send(new GetAllArchdeaconries.Query());
        }

        [HttpPost("search")]
        public async Task<UserResults> Search(SearchArchdeaconries.Query query)
        {
            return await _mediator.Send(query);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("add")]
        public async Task<SaveArchdeaconry.Response> Add(SaveArchdeaconry.Command command)
        {
            command.Id = null;

            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("edit")]
        public async Task<SaveArchdeaconry.Response> Edit(SaveArchdeaconry.Command command)
        {
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(Domain.Commands.DeleteArchdeaconry.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }
    }
}
