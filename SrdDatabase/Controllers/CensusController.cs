using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Censuses;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Censuses;
using SrdDatabase.Domain.Commands.Censuses;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class CensusController : BaseController
    {
        private readonly IMediator _mediator;

        public CensusController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Census> GetById(int id)
        {
            return await _mediator.Send(new GetCensusById.Query(id));
        }


        [HttpGet("details/{id}")]
        public async Task<CensusDetails> Details(int id)
        {
            return await _mediator.Send(new GetCensusDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Census>> GetAll()
        {
            return await _mediator.Send(new GetAllCensuses.Query());
        }

        [HttpPost("search")]
        public async Task<CensusResults> Search(SearchCensuses.Query query)
        {
            return await _mediator.Send(query);
        }

        [Authorize(UserRole.Contributor)]
        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddCensus.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Contributor)]
        [HttpPost("edit")]
        public async Task<IActionResult> Edit(EditCensus.Command command)
        {
            var canEdit = await CanEdit(command.Id);

            if (!canEdit)
            {
                return Unauthorized("You can only edit censuses that you created.");
            }

            command.SetUserId(CurrentUser.Id);
            await _mediator.Send(command);
            return Ok();
        }

        [Authorize(UserRole.Contributor)]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteCensus.Command command)
        {
            var canEdit = await CanEdit(command.Id);

            if (!canEdit)
            {
                return Unauthorized("You can only delete censuses that you created.");
            }

            var response = await _mediator.Send(command);
            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }

        private async Task<bool> CanEdit(int censusId)
        {
            // Only allow contributors to edit censuses they created
            if (CurrentUser.UserType == UserRole.Contributor)
            {
                var census = await _mediator.Send(new GetCensusById.Query(censusId));

                return census.CreatedBy == CurrentUser.Id;
            }

            return true;
        }
    }
}
