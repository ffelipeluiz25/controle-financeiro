using ControleFinanceiro.Helpers;
namespace ControleFinanceiro.Data.DTOs.Request
{
    public class LoginRequestDTO
    {
        public LoginRequestDTO(string login, string senha)
        {
            Login = login;
            Senha = Utils.GerarHashMd5(senha);
        }

        public string Login { get; set; }
        public string Senha { get; set; }
    }
}