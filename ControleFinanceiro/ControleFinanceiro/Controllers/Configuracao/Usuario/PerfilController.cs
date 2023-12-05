using ControleFinanceiro.Controllers.Master;
using ControleFinanceiro.Custom.Attribute;
using ControleFinanceiro.Services.Interfaces;
using System.Web.Mvc;
namespace ControleFinanceiro.Controllers.Configuracao.Usuario
{
    public class PerfilController : MasterController
    {
        private readonly IUsuarioService _usuarioService;

        public PerfilController(IUsuarioService usuarioService, IFuncionalidadeService funcionalidadeService) : base(funcionalidadeService)
        {
            _usuarioService = usuarioService;
        }

        [CustomAuthorize]
        public ActionResult Index()
        {
            return View("~/Views/Perfil/Perfil.cshtml", _usuarioService.BuscarPorId(_usuarioUsuarioId).Dados);
        }
    }
}