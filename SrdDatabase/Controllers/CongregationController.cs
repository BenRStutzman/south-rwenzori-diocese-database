using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Commands;
using SrdDatabase.Domain.Queries.Congregations;
using SrdDatabase.Domain.Commands.Congregations;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class CongregationController : BaseController
    {
        private readonly IMediator _mediator;

        public CongregationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Congregation> GetById(int id)
        {
            return await _mediator.Send(new GetCongregationById.Query(id));
        }

        [HttpGet("details/{id}")]
        public async Task<CongregationDetails> Details(int id)
        {
            return await _mediator.Send(new GetCongregationDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Congregation>> GetAll()
        {
            return await _mediator.Send(new GetAllCongregations.Query());
        }

        [HttpPost("search")]
        public async Task<CongregationResults> Search(SearchCongregations.Query query)
        {
            return await _mediator.Send(query);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddCongregation.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditCongregation.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteCongregation.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }
    }
}
