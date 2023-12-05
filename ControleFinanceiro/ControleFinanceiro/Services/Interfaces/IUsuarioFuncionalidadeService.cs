using ControleFinanceiro.Data.DTOs;
using System.Collections.Generic;

namespace ControleFinanceiro.Services.Interfaces
{
    public interface IUsuarioFuncionalidadeService
    {
        List<UsuarioFuncionalidadeDTO> ListarUsuarioFuncionalidadePorIdUsuario(int idUsuario);
    }
}