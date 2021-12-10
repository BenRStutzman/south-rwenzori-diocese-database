using MediatR;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Models.Authentication;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Commands;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize(UserRole.Administrator)]
    [Route("api/[controller]")]
    public class UserController : BaseController
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
            return await _mediator.Send(new GetAllUserTypes.Query());
        }

        [HttpPost("search")]
        public async Task<UserResults> Search(SearchUsers.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddUser.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [HttpPost("edit")]
        public async Task<SaveResponse> Edit(EditUser.Command command)
        {
            command.SetUserId(CurrentUser.Id);
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
