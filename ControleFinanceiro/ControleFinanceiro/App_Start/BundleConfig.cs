using System.Web.Optimization;
namespace Certificare
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/bundles/bootstrap").Include("~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/styles.css",
                        "~/Content/bootstrap.css",
                        "~/Content/styles.min.css"));
        }
    }
}