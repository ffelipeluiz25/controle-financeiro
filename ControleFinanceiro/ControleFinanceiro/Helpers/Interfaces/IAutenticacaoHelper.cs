using System.Web;
namespace ControleFinanceiro.Helpers.Interfaces
{
    public interface IAutenticacaoHelper
    {
        void GravaSessao(HttpCookie valor);
        string Get();
        string NomeCokkie();
    }
}