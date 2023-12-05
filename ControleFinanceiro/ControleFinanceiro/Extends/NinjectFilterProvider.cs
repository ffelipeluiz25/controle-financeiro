using Ninject;
using ControleFinanceiro.Filter.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
namespace ControleFinanceiro.Filter
{
    public class NinjectFilterProvider : IFilterProvider
    {
        private readonly IKernel kernel;

        public NinjectFilterProvider(IKernel kernel)
        {
            this.kernel = kernel;
        }

        public IEnumerable<System.Web.Mvc.Filter> GetFilters(ControllerContext controllerContext, ActionDescriptor actionDescriptor)
        {
            var parameter = new FilterContextParameter(controllerContext, actionDescriptor);
            return this.kernel.GetAll<INinjectFilter>(parameter).SelectMany(filter => filter.BuildFilters(parameter));
        }
    }
}