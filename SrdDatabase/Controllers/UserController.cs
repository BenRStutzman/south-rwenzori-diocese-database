using MediatR;
using MicrosoftAuthorization = Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Data.Commands;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.User;
using SrdDatabase.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using SrdDatabase.Domain.Queries;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        private readonly IMediator _mediator;

        public UserController(IUserService userService, IMediator mediator)
        {
            _userService = userService;
            _mediator = mediator;
        }

        [MicrosoftAuthorization.AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthenticateUser.Query query)
        {
            var response = await _userService.Authenticate(query);

            if (response == null)
            {
                return BadRequest("Username or password is incorrect");
            }

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<User> GetById(int id)
        {
            return await _mediator.Send(new GetUserById.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<User>> GetAll()
        {
            return await _mediator.Send(new GetAllUsers.Query());
        }

        [HttpGet("types")]
        public async Task<IEnumerable<UserType>> GetTypes()
        {
            return await _mediator.Send(new GetUserTypes.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<User>> Search([FromBody] SearchUsers.Query query)
        {
            return await _mediator.Send(query);
        }

        [MicrosoftAuthorization.AllowAnonymous]
        [HttpPost("save")]
        public async Task<int> Save([FromBody] SaveUser.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteUser.Command command)
        {
            await _mediator.Send(command);

            return Ok();
        }
    }
}
