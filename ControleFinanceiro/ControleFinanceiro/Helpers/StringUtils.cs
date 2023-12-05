using System;
using System.Text;
namespace ControleFinanceiro.Helpers
{
    public static class StringUtils
    {

        public const string COMMA_SEPARATOR = ",";

        #region Base64
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public static string Base64Encode(string value)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(value);
            return Convert.ToBase64String(plainTextBytes);
        }
        #endregion
    }
}