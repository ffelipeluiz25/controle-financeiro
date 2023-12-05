using ControleFinanceiro.Data.DTOs;
using ControleFinanceiro.Data.DTOs.Request;
using System.Threading.Tasks;
namespace ControleFinanceiro.Services.Interfaces
{
    public interface ILoginService
    {
        Task<ResultDTO<UsuarioDTO>> Logar(LoginRequestDTO loginRequest);
    }
}