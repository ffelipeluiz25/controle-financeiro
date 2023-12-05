using Certificare.Data.DTOs;
using System.Collections.Generic;

namespace Certificare.Services.Interfaces
{
    public interface IUsuarioService
    {
        ResultDTO<UsuarioDTO> BuscarPorId(int id);
        ResultDTO<List<FuncionalidadeDTO>> ListarFuncionalidadeVersusUsuario(int id);
        List<UsuarioDTO> ListarUsuariosFiltro(UsuarioRequestDTO request);
        ResultDTO SalvarUsuario(UsuarioDTO usuario, List<string> listaIdFuncionalidades);
        ResultDTO InativarUsuario(int idUsuario);
    }
}