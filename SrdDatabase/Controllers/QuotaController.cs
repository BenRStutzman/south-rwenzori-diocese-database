using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Quotas;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Quotas;
using SrdDatabase.Domain.Commands.Quotas;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize(UserRole.Accountant)]
    [Route("api/[controller]")]
    public class QuotaController : BaseController
    {
        private readonly IMediator _mediator;

        public QuotaController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Quota> GetById(int id)
        {
            return await _mediator.Send(new GetQuotaById.Query(id));
        }


        [HttpGet("details/{id}")]
        public async Task<QuotaDetails> Details(int id)
        {
            return await _mediator.Send(new GetQuotaDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Quota>> GetAll()
        {
            return await _mediator.Send(new GetAllQuotas.Query());
        }

        [HttpPost("search")]
        public async Task<QuotaResults> Search(SearchQuotas.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddQuota.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditQuota.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteQuota.Command command)
        {
            var response = await _mediator.Send(command);
            return DeleteResult(response);
        }
    }
}
