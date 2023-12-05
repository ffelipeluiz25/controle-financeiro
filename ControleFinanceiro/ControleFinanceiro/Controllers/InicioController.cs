using ControleFinanceiro.Custom.Attribute;
using System.Web.Mvc;
namespace ControleFinanceiro.Controllers
{
    public class InicioController : Controller
    {
        public InicioController() { }

        [CustomAuthorize]
        [Route("")]
        [Route("/Inicio")]
        public ActionResult Index()
        {
            return View("~/Views/Inicio/Index.cshtml");
        }
    }
}