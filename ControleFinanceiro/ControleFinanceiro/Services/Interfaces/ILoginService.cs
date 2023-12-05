using Certificare.Data.DTOs;
using Certificare.Data.DTOs.Request;
using System.Threading.Tasks;
namespace Certificare.Services.Interfaces
{
    public interface ILoginService
    {
        Task<ResultDTO<UsuarioDTO>> Logar(LoginRequestDTO loginRequest);
    }
}