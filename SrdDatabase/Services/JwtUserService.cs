using MediatR;
using Microsoft.IdentityModel.Tokens;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Models.Authentication;
using SrdDatabase.Models.Users;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SrdDatabase.Services
{
    public class JwtUserService : IUserService
    {
        private readonly string _secret;

        private readonly IMediator _mediator;

        public JwtUserService(IMediator mediator)
        {
            _secret = Environment.GetEnvironmentVariable("JWT_SECRET");
            _mediator = mediator;
        }

        public async Task<Response> Authenticate(Request request)
        {
            var user = await _mediator.Send(new GetUserByUsername.Query(request.Username));

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return null;
            }

            var token = GenerateJwtToken(user);
            return new Response(user, token);
        }

        public async Task<User> GetUserFromToken(string token)
        {
            try
            {
                var jwtToken = ValidateJwtToken(token);
                var userId = int.Parse(jwtToken.Claims.First(claim => claim.Type == "id").Value);
                return await _mediator.Send(new GetUserById.Query(userId));
            }
            catch
            {
                // invalid token
                return null;
            }
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private JwtSecurityToken ValidateJwtToken(string token)
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

            return (JwtSecurityToken)validatedToken;
        }
    }
}
