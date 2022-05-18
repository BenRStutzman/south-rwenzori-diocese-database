using MediatR;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using SrdDatabase.Models.Authentication;
using SrdDatabase.Models.Users;
using SrdDatabase.Domain.Queries.Users;
using SrdDatabase.Domain.Commands.Users;

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
        public async Task<IActionResult> Add(AddUser.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            var response = await _mediator.Send(command);
            return SaveResult(response);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> Edit(EditUser.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            var response = await _mediator.Send(command);
            return SaveResult(response);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteUser.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            var response = await _mediator.Send(command);
            return DeleteResult(response);
        }
    }
}
