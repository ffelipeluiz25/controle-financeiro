using ControleFinanceiro.Custom.Attribute;
using ControleFinanceiro.Services.Interfaces;
using System.Web.Mvc;
namespace ControleFinanceiro.Controllers
{
    public class ConfiguracaoController : MasterController
    {
        public ConfiguracaoController(IFuncionalidadeService funcionalidadeService) : base(funcionalidadeService)
        {
        }

        [CustomAuthorize]
        public ActionResult Index()
        {
            return View();
        }
    }
}