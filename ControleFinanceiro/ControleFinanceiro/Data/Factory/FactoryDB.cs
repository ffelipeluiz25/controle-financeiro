using ControleFinanceiro.Helpers;
using MySql.Data.MySqlClient;
namespace ControleFinanceiro.Data.Factory
{
    public class FactoryDB
    {
        public static MySqlConnection SQLConnLocal()
        {
            var dbMPCSConn = Constants.ConnectionStringMySql;
            var MySqlConnection = new MySqlConnection(dbMPCSConn);
            MySqlConnection.Open();
            return MySqlConnection;
        }

        public static void MySqlClose(MySqlConnection cn)
        {
            cn.Close();
            cn.Dispose();
        }
    }
}