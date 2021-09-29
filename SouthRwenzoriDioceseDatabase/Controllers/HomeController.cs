using Microsoft.AspNetCore.Mvc;

namespace SouthRwenzoriDioceseDatabase.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
