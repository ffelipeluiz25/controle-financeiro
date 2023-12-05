using Certificare.Data.Repositorios;
using Certificare.Data.Repositorios.Interfaces;
using Certificare.Extends;
using Certificare.Filter;
using Certificare.Helpers;
using Certificare.Helpers.Interfaces;
using Certificare.Repositorios.Interfaces;
using Certificare.Services;
using Certificare.Services.Interfaces;
using Ninject.Modules;
using Ninject.Web.Common;
using System.Web.Mvc;
namespace Certificare.DependencyInjection
{
    public class MvcModule : NinjectModule
    {
        public override void Load()
        {
            Kernel.Components.Add<INinjectHttpApplicationPlugin, NinjectMvcHttpApplicationPlugin>();
            Kernel.Bind<IDependencyResolver>().To<NinjectDependencyResolver>();
            Kernel.Bind<IFilterProvider>().To<NinjectFilterAttributeFilterProvider>();
            Kernel.Bind<IFilterProvider>().To<NinjectFilterProvider>();
            Kernel.Bind<ModelValidatorProvider>().To<NinjectDataAnnotationsModelValidatorProvider>();
            Kernel.Bind<IAutenticacaoHelper>().To<AutenticacaoHelper>();
            DependencyInjectionService();
            DependencyInjectionRepository();
        }

        private void DependencyInjectionRepository()
        {
            Kernel.Bind<ILoginRepository>().To<LoginRepository>();
            Kernel.Bind<IStatusRepository>().To<StatusRepository>();
            Kernel.Bind<IUsuarioRepository>().To<UsuarioRepository>();
            Kernel.Bind<IUsuarioFuncionalidadeRepository>().To<UsuarioFuncionalidadeRepository>();
        }

        private void DependencyInjectionService()
        {
            Kernel.Bind<ILoginService>().To<LoginService>();
            Kernel.Bind<IStatusService>().To<StatusService>();
            Kernel.Bind<IUsuarioService>().To<UsuarioService>();
            Kernel.Bind<IUsuarioFuncionalidadeService>().To<UsuarioFuncionalidadeService>();
            Kernel.Bind<IFuncionalidadeService>().To<FuncionalidadeService>();
        }
    }
}