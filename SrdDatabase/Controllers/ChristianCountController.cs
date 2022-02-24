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
    [Authorize(UserRole.Accountant)]
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

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddChristianCount.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditChristianCount.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteChristianCount.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }
    }
}
