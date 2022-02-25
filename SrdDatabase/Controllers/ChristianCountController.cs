using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Models.ChristianCounts;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.ChristianCounts;
using SrdDatabase.Domain.Commands.ChristianCounts;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ChristianCountController : BaseController
    {
        private readonly IMediator _mediator;

        public ChristianCountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<ChristianCount> GetById(int id)
        {
            return await _mediator.Send(new GetChristianCountById.Query(id));
        }


        [HttpGet("details/{id}")]
        public async Task<ChristianCountDetails> Details(int id)
        {
            return await _mediator.Send(new GetChristianCountDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<ChristianCount>> GetAll()
        {
            return await _mediator.Send(new GetAllChristianCounts.Query());
        }

        [HttpPost("search")]
        public async Task<ChristianCountResults> Search(SearchChristianCounts.Query query)
        {
            return await _mediator.Send(query);
        }

        [Authorize(UserRole.Contributor)]
        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddChristianCount.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Contributor)]
        [HttpPost("edit")]
        public async Task<IActionResult> Edit(EditChristianCount.Command command)
        {
            var canEdit = await CanEdit(command.Id);

            if (!canEdit)
            {
                return Unauthorized("You can only edit christian counts that you created.");
            }

            command.SetUserId(CurrentUser.Id);
            await _mediator.Send(command);
            return Ok();
        }

        [Authorize(UserRole.Contributor)]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteChristianCount.Command command)
        {
            var canEdit = await CanEdit(command.Id);

            if (!canEdit)
            {
                return Unauthorized("You can only delete christian counts that you created.");
            }

            var response = await _mediator.Send(command);
            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }

        private async Task<bool> CanEdit(int christianCountId)
        {
            // Only allow contributors to edit christian counts they created
            if (CurrentUser.UserType == UserRole.Contributor)
            {
                var christianCount = await _mediator.Send(new GetChristianCountById.Query(christianCountId));

                return christianCount.CreatedBy == CurrentUser.Id;
            }

            return true;
        }
    }
}
