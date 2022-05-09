using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers
{
    public class BaseController : Controller
    {
        public User CurrentUser => (User)HttpContext.Items["User"];

        public IActionResult SaveResult(SaveResponse response)
        {
            if (response.Succeeded)
            {
                return Ok(response);
            }
            else
            {
                ModelState.AddModelError(response.ErrorField, response.ErrorMessage);
                return ValidationProblem();
            }
        }

        public IActionResult DeleteResult(DeleteResponse response)
        {
            return response.Succeeded? Ok() : BadRequest(response.ErrorMessage);
        }
    }
}
