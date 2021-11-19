using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Data;

namespace SrdDatabase.Services
{
    public class MySqlDbService : IDbService
    {
        private readonly string _connectionString;

        public MySqlDbService()
        {
            _connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
            DefaultTypeMap.MatchNamesWithUnderscores = true;
        }

        public IDbConnection GetConnection() => new MySqlConnection(_connectionString);
    }
}
