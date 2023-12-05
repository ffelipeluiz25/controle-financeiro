using ControleFinanceiro.Controllers.Master;
using ControleFinanceiro.Custom.Attribute;
using ControleFinanceiro.Services.Interfaces;
using System.Web.Mvc;
namespace ControleFinanceiro.Controllers.Configuracao
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