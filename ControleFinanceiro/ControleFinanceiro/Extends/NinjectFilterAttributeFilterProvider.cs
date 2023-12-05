using Ninject;
using System.Collections.Generic;
using System.Web.Mvc;
namespace ControleFinanceiro.Filter
{
    public class NinjectFilterAttributeFilterProvider : FilterAttributeFilterProvider
    {
        private readonly IKernel kernel;

        public NinjectFilterAttributeFilterProvider(IKernel kernel)
        {
            this.kernel = kernel;
        }

        protected override IEnumerable<FilterAttribute> GetControllerAttributes(
            ControllerContext controllerContext,
            ActionDescriptor actionDescriptor)
        {
            var attributes = base.GetControllerAttributes(controllerContext, actionDescriptor);
            foreach (var attribute in attributes)
            {
                this.kernel.Inject(attribute);
            }

            return attributes;
        }

        protected override IEnumerable<FilterAttribute> GetActionAttributes(
            ControllerContext controllerContext,
            ActionDescriptor actionDescriptor)
        {
            var attributes = base.GetActionAttributes(controllerContext, actionDescriptor);
            foreach (var attribute in attributes)
            {
                this.kernel.Inject(attribute);
            }

            return attributes;
        }
    }
}