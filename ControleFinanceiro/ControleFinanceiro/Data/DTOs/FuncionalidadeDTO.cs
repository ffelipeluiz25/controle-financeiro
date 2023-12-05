
namespace ControleFinanceiro.Data.DTOs
{
    public class FuncionalidadeDTO : BaseDTO
    {
        public string Descricao { get; set; }

        //Custom
        public bool Checado { get; set; }
    }
}