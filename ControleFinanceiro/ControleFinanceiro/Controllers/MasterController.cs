using ControleFinanceiro.Data.DTOs;
using ControleFinanceiro.Helpers;
using ControleFinanceiro.Services.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using System.Web.Routing;
namespace ControleFinanceiro.Controllers
{
    public class MasterController : Controller
    {
        public string _usuarioSessao;
        public string _usuarioHost;
        public string _usuarioNome;
        public int _usuarioUsuarioId;
        public List<UsuarioFuncionalidadeDTO> _listaFuncionalidadesUsuario;
        private readonly IFuncionalidadeService _funcionalidadeService;
        const string cookieKeyPermissoes = "cf_permissao_session";

        public MasterController(IFuncionalidadeService funcionalidadeService)
        {
            _funcionalidadeService = funcionalidadeService;
        }

        protected override void Initialize(RequestContext context)
        {
            base.Initialize(context);

            //Usuario Logado em Cookie
            var cookie = Request.Cookies["cf_login_session"];

            if (cookie != null)
                _usuarioSessao = StringUtils.Base64Decode(Request.Cookies["cf_login_session"] != null ? cookie.Value : string.Empty);

            if (string.IsNullOrEmpty(_usuarioSessao))
                return;

            //Maquina do Usuario
            string[] hostName;

            try
            {
                hostName = Request.UserHostAddress != null ? Dns.GetHostEntry(Request.UserHostAddress).HostName.Split('.') : new[] { "UNKNOWN" };
            }
            catch (Exception)
            {
                hostName = new[] { "UNKNOWN" };
            }

            if (hostName.Length > 0)
                _usuarioHost = hostName[0].ToUpper();

            //Login do Usuário
            if (_usuarioSessao.Contains("\\"))
            {
                try
                {
                    _usuarioUsuarioId = Convert.ToInt32(_usuarioSessao.Split('\\')[0]);
                    _usuarioNome = _usuarioSessao.Split('\\')[1];
                }
                catch (Exception)
                {
                    _usuarioUsuarioId = 0;
                    _usuarioNome = _usuarioSessao;
                }
            }
            else
                _usuarioNome = _usuarioSessao;

            var cokkieListaFuncionalidades = Session[cookieKeyPermissoes];
            if (_usuarioUsuarioId > 0 && cokkieListaFuncionalidades == null)
            {
                _listaFuncionalidadesUsuario = _funcionalidadeService.ListarFuncionalidadePorIdUsuario(_usuarioUsuarioId);
                var json = JsonConvert.SerializeObject(_listaFuncionalidadesUsuario);
                var valueCookie = StringUtils.Base64Encode(json);
                Session[cookieKeyPermissoes] = valueCookie;
            }
            else
            {
                var decodeJson = StringUtils.Base64Decode(cokkieListaFuncionalidades.ToString());
                var lista = JsonConvert.DeserializeObject<List<UsuarioFuncionalidadeDTO>>(decodeJson);
                _listaFuncionalidadesUsuario = lista;
            }
        }

        internal string AddErrors()
        {
            var errors = string.Empty;

            foreach (var modelStateVal in ViewData.ModelState.Values)
            {
                foreach (var item in modelStateVal.Errors.Select(error => error.ErrorMessage))
                {
                    errors += $"<p>{item}</p>";
                }
            }

            return errors;
        }
    }
}