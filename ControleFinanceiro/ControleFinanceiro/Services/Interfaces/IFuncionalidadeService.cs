using ControleFinanceiro.Data.DTOs;
using System.Collections.Generic;
namespace ControleFinanceiro.Services.Interfaces
{
    public interface IFuncionalidadeService
    {
        List<UsuarioFuncionalidadeDTO> ListarFuncionalidadePorIdUsuario(int usuarioUsuarioId);
        List<FuncionalidadeDTO> ListarFuncionalidadeTodos();
    }
}