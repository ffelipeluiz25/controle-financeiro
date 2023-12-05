
namespace ControleFinanceiro.Data.DTOs
{
    public class UsuarioRequestDTO
    {
        public string CPF { get; set; }
        public string NomeCompleto { get; set; }
        public string Email { get; set; }
        public int? IdStatus { get; set; }

        public string StatusDescricao { get; set; }
    }
}