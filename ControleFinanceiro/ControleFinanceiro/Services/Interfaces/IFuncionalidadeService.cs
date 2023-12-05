using Certificare.Data.DTOs;
using System.Collections.Generic;
namespace Certificare.Services.Interfaces
{
    public interface IFuncionalidadeService
    {
        List<UsuarioFuncionalidadeDTO> ListarFuncionalidadePorIdUsuario(int usuarioUsuarioId);
        List<FuncionalidadeDTO> ListarFuncionalidadeTodos();
    }
}