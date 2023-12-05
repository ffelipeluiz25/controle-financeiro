using ControleFinanceiro.Helpers;
using ControleFinanceiro.Data.Enumeradores;
using System.Collections.Generic;

namespace ControleFinanceiro.Data.DTOs
{
    public class UsuarioDTO : BaseDTO
    {
        public string NomeCompleto { get; set; }
        public string CPF { get; set; }
        public string CPFFormatadoSemPonto
        {
            get
            {
                return !string.IsNullOrEmpty(CPF) ? CPF.Replace(".", "").Replace(".", "").Replace("-", "") : string.Empty;
            }
        }
        public string Login { get; set; }
        public string Senha { get; set; }
        public string StatusDescricao { get; set; }
        public bool StatusSituacaoFormatado { get; set; }
        public bool Situacao
        {
            get
            {
                if (string.IsNullOrEmpty(StatusDescricao))
                    return true;

                return StatusDescricao.ToLower().Equals(EnumStatus.Ativo.GetDisplayAttributeFrom(typeof(EnumStatus)).ToLower());
            }
        }
        public List<UsuarioFuncionalidadeDTO> UsuarioFuncionalidades { get; set; }
        public bool RedirectLogin { get; set; } = false;
    }
}