using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

namespace SrdDatabase.Services
{
    public class MySqlDbService : IDbService
    {
        private readonly string _dbServiceString;

        private const string _dbServiceStringName = "MySql";

        public MySqlDbService(IConfiguration configuration)
        {
            _dbServiceString = configuration.GetConnectionString(_dbServiceStringName);
            DefaultTypeMap.MatchNamesWithUnderscores = true;
        }

        public IDbConnection GetConnection() => new MySqlConnection(_dbServiceString);
    }
}
