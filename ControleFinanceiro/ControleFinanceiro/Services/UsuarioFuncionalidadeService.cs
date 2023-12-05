using Certificare.Data.DTOs;
using Certificare.Data.Repositorios.Interfaces;
using Certificare.Services.Interfaces;
using System.Collections.Generic;

namespace Certificare.Services
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