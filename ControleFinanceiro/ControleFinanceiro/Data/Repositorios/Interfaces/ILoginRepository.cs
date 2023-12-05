using ControleFinanceiro.Data.DTOs;
using ControleFinanceiro.Data.DTOs.Request;
using System.Threading.Tasks;
namespace ControleFinanceiro.Repositorios.Interfaces
{
    public interface ILoginRepository
    {
        Task<ResultDTO<UsuarioDTO>> Logar(LoginRequestDTO loginRequest);
    }
}