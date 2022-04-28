using MediatR;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using System.Collections.Generic;
using System.Threading.Tasks;
using SrdDatabase.Models.Sacco.Members;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Sacco.Members;
using SrdDatabase.Domain.Commands.Sacco.Members;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers.Sacco
{
    [ApiController]
    [Authorize(UserRole.Sacco)]
    [Route("api/sacco/[controller]")]
    public class MemberController : BaseController
    {
        private readonly IMediator _mediator;

        public MemberController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Member> GetById(int id)
        {
            return await _mediator.Send(new GetMemberById.Query(id));
        }

        [HttpGet("details/{id}")]
        public async Task<MemberDetails> Details(int id)
        {
            return await _mediator.Send(new GetMemberDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Member>> GetAll()
        {
            return await _mediator.Send(new GetAllMembers.Query());
        }

        [HttpPost("search")]
        public async Task<MemberResults> Search(SearchMembers.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddMember.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditMember.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteMember.Command command)
        {
            await _mediator.Send(command);

            return Ok();
        }
    }
}
