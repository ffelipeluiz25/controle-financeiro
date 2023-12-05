using Ninject;
using Ninject.Activation;
using Ninject.Components;
using Ninject.Web.Common;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace Certificare.Extends
{
    public class NinjectMvcHttpApplicationPlugin : NinjectComponent, INinjectHttpApplicationPlugin
    {
        private readonly IKernel kernel;

        public NinjectMvcHttpApplicationPlugin(IKernel kernel)
        {
            this.kernel = kernel;
        }

        public void Start()
        {
            ModelValidatorProviders.Providers.Remove(ModelValidatorProviders.Providers.OfType<DataAnnotationsModelValidatorProvider>().Single());
            DependencyResolver.SetResolver(this.CreateDependencyResolver());
            RemoveDefaultAttributeFilterProvider();
        }

        public void Stop()
        {
        }

        public object GetRequestScope(IContext context)
        {
            return HttpContext.Current;
        }

        protected IDependencyResolver CreateDependencyResolver()
        {
            return this.kernel.Get<IDependencyResolver>();
        }

        private static void RemoveDefaultAttributeFilterProvider()
        {
            var oldFilter = FilterProviders.Providers.Single(f => f is FilterAttributeFilterProvider);
            FilterProviders.Providers.Remove(oldFilter);
        }
    }
}