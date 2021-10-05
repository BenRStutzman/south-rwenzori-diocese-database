using System.Data;

namespace SrdDatabase.Services
{
    public interface IDbService
    {
        IDbConnection GetConnection();
    }
}
