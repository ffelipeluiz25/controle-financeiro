using Certificare.Data.DTOs;
using System.Collections.Generic;
namespace Certificare.Data.Repositorios.Interfaces
{
    public interface IUsuarioRepository
    {
        #region Consulta

        ResultDTO<List<UsuarioDTO>> ListarUsuariosFiltro(UsuarioRequestDTO request);
        ResultDTO<UsuarioDTO> BuscarPorId(int id);

        #endregion Consulta

        ResultDTO InserirUsuario(UsuarioDTO usuario, List<string> listaIdFuncionalidades);
        ResultDTO EditarUsuario(UsuarioDTO usuario, List<string> listaIdFuncionalidades);
        ResultDTO InativarUsuario(int idUsuario);
    }
}