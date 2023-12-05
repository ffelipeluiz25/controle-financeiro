using ControleFinanceiro.Data.DTOs;
using ControleFinanceiro.Data.DTOs.Request;
using ControleFinanceiro.Repositorios.Interfaces;
using ControleFinanceiro.Services.Interfaces;
using System.Threading.Tasks;
namespace ControleFinanceiro.Services
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