using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.User;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SrdDatabase.Services
{
    public class JwtUserService : IUserService
    {
        private readonly string _secret;

        private readonly IMediator _mediator;

        public JwtUserService(IConfiguration configuration, IMediator mediator)
        {
            _secret = configuration.GetValue<string>("Authentication:Secret");
            _mediator = mediator;
        }

        public async Task<AuthenticationResponse> Authenticate(AuthenticateUser.Query query)
        {
            var user = await _mediator.Send(query);

            if (user == null)
            {
                return null;
            }

            var token = GenerateJwtToken(user);
            return new AuthenticationResponse(user, token);
        }

        public IEnumerable<User> GetAll()
        {
            // TODO
            throw new NotImplementedException();
        }

        public User GetById(int id)
        {
            // TODO
            throw new NotImplementedException();
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
    }
}
