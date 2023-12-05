using System.ComponentModel.DataAnnotations;
namespace ControleFinanceiro.Data.Enumeradores
{
    public enum EnumStatus
    {
        [Display(Name = "Ativo")]
        Ativo = 1,
        [Display(Name = "Inativo")]
        Inativo = 2,
        [Display(Name = "Pago")]
        Pago = 3,
        [Display(Name = "Em Aberto")]
        EmAberto = 4,
        [Display(Name = "Atrasado")]
        Atrasado = 5,
        [Display(Name = "Excluído")]
        Excluido = 6
    }
}