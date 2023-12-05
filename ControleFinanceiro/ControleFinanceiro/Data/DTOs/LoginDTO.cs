using System.ComponentModel.DataAnnotations;
namespace Certificare.Data.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Login campo obrigatório.")]
        public string Login { get; set; }
        [Required(ErrorMessage = "Senha campo obrigatório.")]
        public string Senha { get; set; }
        public string Mensagem { get; set; }
    }
}