using System.ComponentModel.DataAnnotations;
namespace ControleFinanceiro.Data.Enumeradores
{
    public enum EnumPermissoes
    {
        [Display(Name = "Permite Criar Recibos (Em Aberto)")]
        PermiteCriarRecibosEmAberto = 1,
        [Display(Name = "Permite Alterar Recibos (Em Aberto)")]
        PermiteAlterarRecibosEmAberto = 2,
        [Display(Name = "Permite Excluir Recibos (Em Aberto)")]
        PermiteExcluirRecibosEmAberto = 3,
        [Display(Name = "Permite Fechamento de Caixa")]
        PermiteFechamentoCaixa = 4,
        [Display(Name = "Permite Realizar Lançamento de Gastos - Ceridões")]
        PermiteRealizarLancamentoGastosCeridoes = 5,
        [Display(Name = "Permite Realizar Lançamento de Gastos - Registros")]
        PermiteRealizarLancamentoGastosRegistros = 6,
        [Display(Name = "Permite Realizar Lançamento de Gastos - Outros")]
        PermiteRealizarLancamentoGastosOutros = 7,
        [Display(Name = "Permite Lançamento de Estorno")]
        PermiteLancamentodeEstorno = 8,
        [Display(Name = "Permite Alterar Usuários")]
        PermiteAlterarUsuarios = 9,
        [Display(Name = "Permite Inativar Usuários")]
        PermiteInativarUsuarios = 10,
        [Display(Name = "Permite Lançamento de Data Retroativa no Recibo")]
        PermiteLancamentoDataRetroativaRecibo = 11
    }
}