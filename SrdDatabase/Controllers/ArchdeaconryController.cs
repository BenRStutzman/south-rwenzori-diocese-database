using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Archdeaconries;
using System.Collections.Generic;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Commands;
using SrdDatabase.Domain.Queries.Archdeaconries;
using SrdDatabase.Domain.Commands.Archdeaconries;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ArchdeaconryController : BaseController
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
        public async Task<ArchdeaconryResults> Search(SearchArchdeaconries.Query query)
        {
            return await _mediator.Send(query);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddArchdeaconry.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditArchdeaconry.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteArchdeaconry.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }
    }
}
