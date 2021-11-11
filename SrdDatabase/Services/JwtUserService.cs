using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SrdDatabase.Models.User;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace SrdDatabase.Services
{
    public class JwtUserService : IUserService
    {
        private readonly List<User> _fakeUsers = new()
        {
            new User(1, "Test", "User", "test", "test"),
            new User(2, "Test", "User Jr.", "test2", "test2"),
        };

        private readonly string _secret;

        public JwtUserService(IConfiguration configuration)
        {
            _secret = configuration.GetValue<string>("Secret");
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest request)
        {
            var user = _fakeUsers.SingleOrDefault(user =>
                user.Username == request.Username && user.Password == request.Password);

            if (user == null)
            {
                return null;
            }

            var token = GenerateJwtToken(user);
            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<User> GetAll()
        {
            return _fakeUsers;
        }

        public User GetById(int id)
        {
            return _fakeUsers.FirstOrDefault(user => user.Id == id);
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
