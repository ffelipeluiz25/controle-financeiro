using Certificare.Custom.Attribute;
using Certificare.Data.DTOs;
using Certificare.Data.DTOs.Request;
using Certificare.Helpers;
using Certificare.Helpers.Interfaces;
using Certificare.Services.Interfaces;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Certificare.Controllers
{
    public class LoginController : Controller
    {
        private readonly ILoginService _loginService;
        private readonly IAutenticacaoHelper _autenticacaoHelper;

        public LoginController(ILoginService loginService, IAutenticacaoHelper autenticacaoHelper)
        {
            _loginService = loginService;
            _autenticacaoHelper = autenticacaoHelper;
        }

        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize]
        public ActionResult Sair()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginDTO model)
        {
            if (ModelState.IsValid)
            {
                var resultLogin = await _loginService.Logar(new LoginRequestDTO(model.Login, model.Senha));
                if (!resultLogin.Sucesso || resultLogin.Dados == null)
                {
                    ModelState.AddModelError("Login", resultLogin.Mensagem);
                    return View("Index", model);
                }

                var valueCookie = StringUtils.Base64Encode(resultLogin.Dados.Id + "\\" + resultLogin.Dados.NomeCompleto + "\\" + DateTime.Now.AddMinutes(1440));
                _autenticacaoHelper.GravaSessao(new System.Web.HttpCookie(_autenticacaoHelper.NomeCokkie(), valueCookie));
                return RedirectToAction("Index", "Home");
            }
            return View("Index", model);
        }
    }
}