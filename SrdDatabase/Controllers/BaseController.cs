using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers
{
    public class BaseController : Controller
    {
        public User CurrentUser => (User)HttpContext.Items["User"];
    }
}
