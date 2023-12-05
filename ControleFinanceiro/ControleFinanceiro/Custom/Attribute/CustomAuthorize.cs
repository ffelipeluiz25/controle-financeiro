using Certificare.Helpers;
using System;
using System.Web.Mvc;
namespace Certificare.Custom.Attribute
{
    public class CustomAuthorize : AuthorizeAttribute
    {

        const string cookieKeyPermissoes = "certificare_permissao_session";
        public CustomAuthorize()
        {
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var cookie = new AutenticacaoHelper(filterContext.HttpContext).Get();
            if (cookie == null || cookie.Equals(string.Empty)) //Usuário não está logado.
            {
                filterContext.HttpContext.Session[cookieKeyPermissoes] = null;
                filterContext.Result = new RedirectResult("/Login");
                return;
            }

            var url = filterContext.HttpContext.Request.AppRelativeCurrentExecutionFilePath.Replace("~/", "");
            if (url.ToLower().Contains("login"))
            {
                filterContext.HttpContext.Session[cookieKeyPermissoes] = null;
                new AutenticacaoHelper(filterContext.HttpContext).LimpaCookie();
                filterContext.Result = new RedirectResult("/Login");
                return;
            }

            var validalogin = true;
            var resultCookie = StringUtils.Base64Decode(cookie);
            string Data;
            try
            {
                Data = resultCookie.Split('\\')[2];
            }
            catch (Exception)
            {
                filterContext.HttpContext.Session[cookieKeyPermissoes] = null;
                new AutenticacaoHelper(filterContext.HttpContext).LimpaCookie();
                filterContext.Result = new RedirectResult("/Login");
                return;
            }

            var dataExpiracao = Convert.ToDateTime(Data);
            if (dataExpiracao <= DateTime.Now)
                validalogin = false;

            if (!validalogin)
            {
                filterContext.HttpContext.Session[cookieKeyPermissoes] = null;
                new AutenticacaoHelper(filterContext.HttpContext).LimpaCookie();
                filterContext.Result = new RedirectResult("/Login");
                return;
            }
        }
    }
}