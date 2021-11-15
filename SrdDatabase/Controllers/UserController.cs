using MediatR;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Data.Commands;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.User;
using SrdDatabase.Services;
using System.Threading.Tasks;

namespace SrdDatabase.Controllers
{
    [ApiController]
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

        [HttpPost("save")]
        public async Task<int> Save(SaveUser.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}
