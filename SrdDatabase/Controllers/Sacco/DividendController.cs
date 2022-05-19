using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Sacco.Dividends;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Sacco.Dividends;
using SrdDatabase.Domain.Commands.Sacco.Dividends;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize(UserRole.Sacco)]
    [Route("api/sacco/[controller]")]
    public class DividendController : BaseController
    {
        private readonly IMediator _mediator;

        public DividendController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Dividend> GetById(int id)
        {
            return await _mediator.Send(new GetDividendById.Query(id));
        }


        [HttpGet("details/{id}")]
        public async Task<DividendDetails> Details(int id)
        {
            return await _mediator.Send(new GetDividendDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Dividend>> GetAll()
        {
            return await _mediator.Send(new GetAllDividends.Query());
        }

        [HttpPost("search")]
        public async Task<DividendResults> Search(SearchDividends.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddDividend.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> Edit(EditDividend.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return Ok(await _mediator.Send(command));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteDividend.Command command)
        {
            var response = await _mediator.Send(command);
            return DeleteResult(response);
        }
    }
}
