using ControleFinanceiro.Data.DTOs;
using System.Collections.Generic;
namespace ControleFinanceiro.Data.Repositorios.Interfaces
{
    public interface IFuncionalidadeRepository
    {
        ResultDTO<List<UsuarioFuncionalidadeDTO>> ListarFuncionalidadePorIdUsuario(int IdUsuario);
        ResultDTO<List<FuncionalidadeDTO>> ListarFuncionalidadeTodos();
    }
}