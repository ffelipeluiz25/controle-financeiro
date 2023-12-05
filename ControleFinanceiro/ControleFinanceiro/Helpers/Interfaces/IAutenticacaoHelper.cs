using System.Web;
namespace Certificare.Helpers.Interfaces
{
    public interface IAutenticacaoHelper
    {
        void GravaSessao(HttpCookie valor);
        string Get();
        string NomeCokkie();
    }
}