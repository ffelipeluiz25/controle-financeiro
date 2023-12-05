using ControleFinanceiro.Data.Repositorios;
using ControleFinanceiro.Data.Repositorios.Interfaces;
using ControleFinanceiro.Extends;
using ControleFinanceiro.Filter;
using ControleFinanceiro.Helpers;
using ControleFinanceiro.Helpers.Interfaces;
using ControleFinanceiro.Repositorios.Interfaces;
using ControleFinanceiro.Services;
using ControleFinanceiro.Services.Interfaces;
using Ninject.Modules;
using Ninject.Web.Common;
using System.Web.Mvc;
namespace ControleFinanceiro.DependencyInjection
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