using Certificare.Data.DTOs;
using System.Collections.Generic;

namespace Certificare.Services.Interfaces
{
    public interface IUsuarioFuncionalidadeService
    {
        List<UsuarioFuncionalidadeDTO> ListarUsuarioFuncionalidadePorIdUsuario(int idUsuario);
    }
}