using Microsoft.AspNetCore.Mvc;

namespace SouthRwenzoriDioceseDatabase.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
