using Certificare.Custom.Attribute;
using System.Web.Mvc;
namespace Certificare.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {

        }

        [CustomAuthorize]
        public ActionResult Index()
        {
            return View();
        }
    }
}