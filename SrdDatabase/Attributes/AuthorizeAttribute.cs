using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SrdDatabase.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SrdDatabase.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly IEnumerable<UserRole> _roles;

        public AuthorizeAttribute(params UserRole[] roles)
        {
            _roles = roles ?? Enumerable.Empty<UserRole>();
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
                context.Result = new UnauthorizedObjectResult("Unauthorized");
            }
        }
    }
}
