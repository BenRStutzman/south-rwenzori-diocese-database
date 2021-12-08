using MediatR;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Data.Commands;
using SrdDatabase.Data.Queries;
using SrdDatabase.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Models.Authentication;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize(UserRole.Administrator)]
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

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthenticationRequest request)
        {
            var response = await _userService.Authenticate(request);

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

        [HttpGet("details/{id}")]
        public async Task<UserDetails> Details(int id)
        {
            return await _mediator.Send(new GetUserDetails.Query(id));
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
        public async Task<UserResults> Search(SearchUsers.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveUser.Response> Add(SaveUser.Command command)
        {
            command.Id = null;

            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<SaveUser.Response> Edit(SaveUser.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteUser.Command command)
        {
            await _mediator.Send(command);

            return Ok();
        }
    }
}
