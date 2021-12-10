using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SrdDatabase.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SrdDatabase.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly IEnumerable<UserRole> _roles;

        public AuthorizeAttribute(UserRole minimumRole = UserRole.Viewer)
        {
            _roles = Enum.GetValues(typeof(UserRole))
                    .Cast<UserRole>()
                    .Where(role => (int)role >= (int)minimumRole);
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // Skip for AllowAnonymous attribute
            if (context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any())
            {
                return;
            }

            var user = (User)context.HttpContext.Items["User"];

            if (user == null || (_roles.Any() && !_roles.Contains(user.UserType)))
            {
                context.Result = new UnauthorizedObjectResult("You do not have the necessary privileges to perform this action.");
            }
        }
    }
}
