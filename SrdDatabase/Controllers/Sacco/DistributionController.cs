using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Sacco.Distributions;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Sacco.Distributions;
using SrdDatabase.Domain.Commands.Sacco.Distributions;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize(UserRole.Sacco)]
    [Route("api/sacco/[controller]")]
    public class DistributionController : BaseController
    {
        private readonly IMediator _mediator;

        public DistributionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Distribution> GetById(int id)
        {
            return await _mediator.Send(new GetDistributionById.Query(id));
        }


        [HttpGet("details/{id}")]
        public async Task<DistributionDetails> Details(int id)
        {
            return await _mediator.Send(new GetDistributionDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Distribution>> GetAll()
        {
            return await _mediator.Send(new GetAllDistributions.Query());
        }

        [HttpPost("search")]
        public async Task<DistributionResults> Search(SearchDistributions.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddDistribution.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> Edit(EditDistribution.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return Ok(await _mediator.Send(command));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteDistribution.Command command)
        {
            var response = await _mediator.Send(command);
            return DeleteResult(response);
        }
    }
}
