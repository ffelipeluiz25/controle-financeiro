using ControleFinanceiro.Data.DTOs;
using ControleFinanceiro.Services.Interfaces;
using ControleFinanceiro.Data.Repositorios.Interfaces;
using System.Collections.Generic;
namespace ControleFinanceiro.Services
{
    public class FuncionalidadeService : IFuncionalidadeService
    {
        private readonly IFuncionalidadeRepository _funcionalidadeRepository;

        public FuncionalidadeService(IFuncionalidadeRepository funcionalidadeRepository)
        {
            _funcionalidadeRepository = funcionalidadeRepository;
        }

        public List<UsuarioFuncionalidadeDTO> ListarFuncionalidadePorIdUsuario(int usuarioUsuarioId)
        {
            var retorno = _funcionalidadeRepository.ListarFuncionalidadePorIdUsuario(usuarioUsuarioId);
            return retorno.Dados;
        }

        public List<FuncionalidadeDTO> ListarFuncionalidadeTodos()
        {
            var retorno = _funcionalidadeRepository.ListarFuncionalidadeTodos();
            return retorno.Dados;
        }
    }
}