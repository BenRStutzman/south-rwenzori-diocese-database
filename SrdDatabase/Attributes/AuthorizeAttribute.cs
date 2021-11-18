using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SrdDatabase.Models.User;
using System;
using System.Linq;

namespace SrdDatabase.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // Skip for AllowAnonymous attribute
            if (context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any())
            {
                return;
            }

            var user = (User)context.HttpContext.Items["User"];

            if (user == null)
            {
                context.Result = new UnauthorizedObjectResult("Unauthorized");
            }
        }
    }
}
