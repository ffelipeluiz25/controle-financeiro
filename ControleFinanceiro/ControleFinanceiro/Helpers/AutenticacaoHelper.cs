using Certificare.Helpers.Interfaces;
using System.Web;
namespace Certificare.Helpers
{
    public class AutenticacaoHelper : IAutenticacaoHelper
    {
        private readonly HttpContextBase _contextAcessor;
        const string cookieKey = "certificare_login_session";

        public AutenticacaoHelper(HttpContextBase contextAcessor)
        {
            _contextAcessor = contextAcessor;
        }

        public void LimpaCookie()
        {
            _contextAcessor.Response.Cookies.Set(new HttpCookie(cookieKey, string.Empty));
        }

        public string Get()
        {
            var cookie = _contextAcessor.Request.Cookies.Get(cookieKey);

            if (cookie != null)
            {
                GravaSessao(valor: cookie);
            }

            return cookie != null ? cookie.Value : string.Empty;
        }

        public string NomeCokkie()
        {
            return cookieKey;
        }

        public void GravaSessao(HttpCookie valor)
        {
            _contextAcessor.Response.Cookies.Set(valor);
        }
    }
}