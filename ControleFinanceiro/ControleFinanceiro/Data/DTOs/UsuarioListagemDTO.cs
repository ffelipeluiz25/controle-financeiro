using ControleFinanceiro.Data.Enumeradores;
using System.Collections.Generic;
using System.Linq;
namespace Certificare.Data.DTOs
{
    public class UsuarioListagemDTO : BaseDTO
    {
        public List<UsuarioDTO> ListaUsuario { get; set; }
        public List<UsuarioFuncionalidadeDTO> ListaFuncionalidade { get; set; }
        public bool PermiteAlterarUsuarios
        {
            get
            {
                return ListaFuncionalidade.Any(f => f.IdFuncionalidade.Equals((int)EnumPermissoes.PermiteAlterarUsuarios));
            }
        }
        public bool PermiteInativarUsuarios
        {
            get
            {
                return ListaFuncionalidade.Any(f => f.IdFuncionalidade.Equals((int)EnumPermissoes.PermiteInativarUsuarios));
            }
        }
    }
}