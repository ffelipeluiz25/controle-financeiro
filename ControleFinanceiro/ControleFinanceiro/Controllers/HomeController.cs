using ControleFinanceiro.Custom.Attribute;
using System.Web.Mvc;
namespace ControleFinanceiro.Controllers
{
    public class HomeController : Controller
    {
        public HomeController() { }
        [CustomAuthorize]
        public ActionResult Index()
        {
            return View();
        }
    }
}