﻿using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using SrdDatabase.Services;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Data.Commands
{
    public class SaveUser
    {
        public class Command : IRequest<Response>
        {
            public int? Id { get; set; }

            [Required]
            [StringLength(50)]
            public string Name { get; }

            [Required]
            [StringLength(50)]
            public string Username { get; }

            [StringLength(50)]
            public string Password { get; }

            [Required]
            public byte UserTypeId { get; }

            public Command(
                int? id,
                string name,
                string username,
                string password,
                byte userTypeId)
            {
                if (id == null & string.IsNullOrEmpty(password))
                {
                    throw new ArgumentException("You must set a password.");
                } 

                Id = id;
                Name = name;
                Username = username;
                Password = string.IsNullOrEmpty(password) ? "" : BCrypt.Net.BCrypt.HashPassword(password);
                UserTypeId = userTypeId;
            }
        }

        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly IDbService _dbService;

            private readonly string _storedProcedure = "sto_save_user";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                var id = await connection.QuerySingleAsync<int>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                return new Response(id);
            }
        }

        public class Response
        {
            public int Id { get; }

            public Response(int id)
            {
                Id = id;
            }
        }
    }
}
