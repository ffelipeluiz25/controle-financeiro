using ControleFinanceiro.Data.DTOs;
using ControleFinanceiro.Data.Repositorios.Interfaces;
using ControleFinanceiro.Services.Interfaces;
using System.Collections.Generic;

namespace ControleFinanceiro.Services
{
    public class UsuarioFuncionalidadeService : IUsuarioFuncionalidadeService
    {
        private readonly IUsuarioFuncionalidadeRepository _usuarioFuncionalidadeRepository;

        public UsuarioFuncionalidadeService(IUsuarioFuncionalidadeRepository usuarioFuncionalidadeRepository)
        {
            _usuarioFuncionalidadeRepository = usuarioFuncionalidadeRepository;
        }

        public List<UsuarioFuncionalidadeDTO> ListarUsuarioFuncionalidadePorIdUsuario(int idUsuario)
        {
            var retorno = _usuarioFuncionalidadeRepository.ListarUsuarioFuncionalidadePorIdUsuario(idUsuario);
            return retorno.Dados;
        }
    }
}