using System.Collections.Generic;
namespace ControleFinanceiro.Filter.Interfaces
{
    public interface INinjectFilter
    {
        IEnumerable<System.Web.Mvc.Filter> BuildFilters(FilterContextParameter parameter);
    }
}