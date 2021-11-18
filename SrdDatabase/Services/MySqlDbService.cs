using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

namespace SrdDatabase.Services
{
    public class MySqlDbService : IDbService
    {
        private readonly string _connectionString;

        private const string _connectionStringName = "MySql";

        public MySqlDbService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString(_connectionStringName);
            DefaultTypeMap.MatchNamesWithUnderscores = true;
        }

        public IDbConnection GetConnection() => new MySqlConnection(_connectionString);
    }
}
