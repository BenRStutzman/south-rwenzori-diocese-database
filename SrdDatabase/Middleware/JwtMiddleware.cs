using Microsoft.AspNetCore.Http;
using SrdDatabase.Services;
using System.Linq;
using System.Threading.Tasks;

namespace SrdDatabase.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IUserService _userService;

        public JwtMiddleware(
            RequestDelegate next,
            IUserService userService)
        {
            _next = next;
            _userService = userService;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                context.Items["User"] = await _userService.GetUserFromToken(token);
            }

            await _next(context);
        }
    }
}
