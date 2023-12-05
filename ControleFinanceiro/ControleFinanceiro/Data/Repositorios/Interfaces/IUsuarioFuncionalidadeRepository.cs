using ControleFinanceiro.Data.DTOs;
using System.Collections.Generic;

namespace ControleFinanceiro.Data.Repositorios.Interfaces
{
    public interface IUsuarioFuncionalidadeRepository
    {
        ResultDTO<List<UsuarioFuncionalidadeDTO>> ListarUsuarioFuncionalidadePorIdUsuario(int idUsuario);

        string GerarScriptDeletePorIdUsuario(int idUsuario);
        string GerarScriptInsert(int idUsuario, List<string> listaIdFuncionalidades);
    }
}