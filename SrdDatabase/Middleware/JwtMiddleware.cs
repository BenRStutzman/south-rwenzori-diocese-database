using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Services;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SrdDatabase.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IMediator _mediator;
        private readonly string _secret;

        public JwtMiddleware(RequestDelegate next, IMediator mediator)
        {
            _next = next;
            _secret = Environment.GetEnvironmentVariable("JWT_SECRET");
            _mediator = mediator;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                await AttachUserToContext(context, token);
            }

            await _next(context);
        }

        private async Task<Unit> AttachUserToContext(HttpContext context, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero,
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(claim => claim.Type == "id").Value);

                context.Items["User"] = await _mediator.Send(new GetUserById.Query(userId));
            }
            catch
            {
            }

            return Unit.Value;
        }
    }
}
