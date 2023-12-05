using Certificare.Data.DTOs;
using Certificare.Data.DTOs.Request;
using System.Threading.Tasks;
namespace Certificare.Repositorios.Interfaces
{
    public interface ILoginRepository
    {
        Task<ResultDTO<UsuarioDTO>> Logar(LoginRequestDTO loginRequest);
    }
}