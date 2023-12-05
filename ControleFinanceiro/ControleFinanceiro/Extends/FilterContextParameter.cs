using Ninject.Parameters;
using System.Web.Mvc;
namespace ControleFinanceiro.Filter
{
    public class FilterContextParameter : Parameter
    {
        public const string ParameterName = "FilterContext";

        public FilterContextParameter(ControllerContext controllerContext, ActionDescriptor actionDescriptor)
            : base(ParameterName, ctx => null, false)
        {
            this.ControllerContext = controllerContext;
            this.ActionDescriptor = actionDescriptor;
        }

        public int AttributePosition { get; set; }

        public ControllerContext ControllerContext { get; private set; }

        public ActionDescriptor ActionDescriptor { get; private set; }
    }
}