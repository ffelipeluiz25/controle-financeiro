using Certificare.Data.DTOs;
using Certificare.Data.DTOs.Request;
using Certificare.Repositorios.Interfaces;
using Certificare.Services.Interfaces;
using System.Threading.Tasks;
namespace Certificare.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepository;
        public LoginService(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }

        public async Task<ResultDTO<UsuarioDTO>> Logar(LoginRequestDTO loginRequest)
        {
            return await _loginRepository.Logar(loginRequest);
        }
    }
}