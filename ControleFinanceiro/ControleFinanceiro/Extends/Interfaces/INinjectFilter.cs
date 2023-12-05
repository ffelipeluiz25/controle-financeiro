using System.Collections.Generic;
namespace Certificare.Filter.Interfaces
{
    public interface INinjectFilter
    {
        IEnumerable<System.Web.Mvc.Filter> BuildFilters(FilterContextParameter parameter);
    }
}