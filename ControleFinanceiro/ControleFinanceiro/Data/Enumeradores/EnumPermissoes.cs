using System.ComponentModel.DataAnnotations;
namespace ControleFinanceiro.Data.Enumeradores
{
    public enum EnumPermissoes
    {
        [Display(Name = "Permite Alterar Usuários")]
        PermiteAlterarUsuarios = 1,
        [Display(Name = "Permite Inativar Usuários")]
        PermiteInativarUsuarios = 2
    }
}