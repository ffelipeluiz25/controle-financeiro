using Certificare.Data.DTOs;
using System.Collections.Generic;
namespace Certificare.Data.Repositorios.Interfaces
{
    public interface IFuncionalidadeRepository
    {
        ResultDTO<List<UsuarioFuncionalidadeDTO>> ListarFuncionalidadePorIdUsuario(int IdUsuario);
        ResultDTO<List<FuncionalidadeDTO>> ListarFuncionalidadeTodos();
    }
}