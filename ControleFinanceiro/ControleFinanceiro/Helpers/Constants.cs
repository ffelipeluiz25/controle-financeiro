namespace Certificare.Helpers
{
    public static class Constants
    {
        public static string ConnectionStringMySql
        {
            get
            {
                var stringConnection = "Server=localhost;Port=3306;Database=controlefinanceiro;Uid=root;Pwd=admin;";
                return stringConnection;
            }
        }
    }
}